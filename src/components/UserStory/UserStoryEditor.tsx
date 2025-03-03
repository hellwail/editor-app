"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { useState, useEffect } from "react"
import styles from "./user-story.module.css"

const TiptapEditor = ({
  placeholder,
  content = "",
  onUpdate,
  isCriteria = false,
}: {
  placeholder: string
  content?: string
  onUpdate: (content: string) => void
  isCriteria?: boolean
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // Важно для сохранения правильной структуры списка
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML())
    },
    // onCreate: ({ editor }) => {
    //   // Удалим автоматическое создание списка при инициализации
    //   // if (isCriteria && !content) {
    //   //   editor.commands.toggleBulletList()
    //   // }
    // },
    editorProps: {
      handleKeyDown: (view, event) => {
        if (isCriteria) {
          if (event.key === "Enter" && !editor?.isEmpty) {
            event.preventDefault()
            // Если мы не в списке, создаем его
            if (!editor?.isActive("bulletList")) {
              editor?.commands.toggleBulletList()
            }
            editor?.commands.splitListItem("listItem")
            return true
          }
        }
        return false
      },
    },
  })

  // Удалим этот useEffect, так как он больше не нужен
  // useEffect(() => {
  //   if (isCriteria && editor && !editor.isActive("bulletList")) {
  //     editor.commands.toggleBulletList()
  //   }
  // }, [editor, isCriteria])

  return (
    <div className={styles.editorWrapper}>
      <EditorContent editor={editor} className={styles.editor} />
    </div>
  )
}

type UserStoryData = {
  title: string
  description: string
  descriptionTitle: string
  criteria: string
  implementation: string
  showImplementation: boolean
}

export default function UserStory() {
  const [storyData, setStoryData] = useState<UserStoryData>(() => {
    const saved = localStorage.getItem("userStory")
    return saved
      ? JSON.parse(saved)
      : {
          // title: "",
          description: "",
          descriptionTitle: "",
          criteria: "", // Изменено с "<ul><li><p></p></li></ul>" на пустую строку
          implementation: "",
          showImplementation: false,
        }
  })

  useEffect(() => {
    localStorage.setItem("userStory", JSON.stringify(storyData))
  }, [storyData])

  const updateField = (field: keyof UserStoryData) => (content: string) => {
    setStoryData((prev) => ({
      ...prev,
      [field]: content,
    }))
  }

  return (
    <div className={styles.container}>
      <div>
        <h1>Прототип шаблона</h1>
        {/* <TiptapEditor placeholder="Введите заголовок..." content={storyData.title} onUpdate={updateField("title")} /> */}
      </div>

        {/* <h3>Описание</h3> */}
        <div className={styles.descriptionTitle}>
        <TiptapEditor
          placeholder="Описание"
          content={storyData.descriptionTitle}
          onUpdate={updateField("descriptionTitle")}
        />
        </div>
        <div>
        <TiptapEditor
          placeholder="Описание кому предназначен инкремент. Зачем это ему нужно и что он сможет сделать с ним. Вкратце что будет собой представлять инкремент и как он будет выглядеть."
          content={storyData.description}
          onUpdate={updateField("description")}
        />
      </div>

      <div>
        <h3 className={styles.criteriaTitle}>Критерии выполнения</h3>
        <TiptapEditor
          placeholder="Перечень конкретных проверяемых критериев (условий), которые должны быть выполнены по результатам инкремента."
          content={storyData.criteria}
          onUpdate={updateField("criteria")}
          isCriteria={true}
        />
      </div>

      <button
        onClick={() =>
          setStoryData((prev) => ({
            ...prev,
            showImplementation: !prev.showImplementation,
          }))
        }
        className={styles.addImplementation}
      >
       <h4 className={styles.realizationTitle}> {storyData.showImplementation ? "- Скрыть реализацию" : "+ Реализация"}</h4>
      </button>

      {storyData.showImplementation && (
        <div>
          <TiptapEditor
            placeholder="Описание подхода к решению, технически скрытых от пользователя деталей. Например, какие нужно использовать библиотеки, подход к архитектуре или хранению данных."
            content={storyData.implementation}
            onUpdate={updateField("implementation")}
          />
        </div>
      )}
    </div>
  )
}

