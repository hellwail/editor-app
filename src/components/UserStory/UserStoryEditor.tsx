import { useEffect } from "react"
import styles from "./user-story.module.css"
import { BaseEditor } from "../BaseEditor"
import { useEditor } from "../useEditor"
import { useEditorNavigation } from "../UseEditorNavigation"

type UserStoryData = {
  title: string
  description: string
  descriptionTitle: string
  criteria: string
  implementation: string
  showImplementation: boolean
}

export default function UserStory() {
  const {
    data: storyData,
    updateField,
    setData,
  } = useEditor<UserStoryData>({
    title: "",
    description: "",
    descriptionTitle: "",
    criteria: "",
    implementation: "",
    showImplementation: false,
  })

  const { registerEditor, handleKeyDown } = useEditorNavigation()

  useEffect(() => {
    const saved = localStorage.getItem("userStory")
    if (saved) {
      setData(JSON.parse(saved))
    }
  }, [setData])

  useEffect(() => {
    localStorage.setItem("userStory", JSON.stringify(storyData))
  }, [storyData])

  return (
    <div className={styles.container}>
      <div>
        <h1>Прототип шаблонов</h1>
      </div>
      <div className={styles.descriptionTitle}>
        <BaseEditor
          placeholder="Название инкремента, что получим по результатам"
          content={storyData.descriptionTitle}
          onUpdate={updateField("descriptionTitle")}
          onKeyDown={handleKeyDown(0)}
          ref={registerEditor(0)}
        />
      </div>
      <div>
        <BaseEditor
          placeholder="Описание кому предназначен инкремент. Зачем это ему нужно и что он сможет сделать с ним. Вкратце что будет собой представлять инкремент и как он будет выглядеть."
          content={storyData.description}
          onUpdate={updateField("description")}
          onKeyDown={handleKeyDown(1)}
          ref={registerEditor(1)}
        />
      </div>

      <div>
        <h3 className={styles.criteriaTitle}>Критерии выполнения</h3>
        <BaseEditor
          placeholder="Перечень конкретных проверяемых критериев (условий), которые должны быть выполнены по результатам инкремента."
          content={storyData.criteria}
          onUpdate={updateField("criteria")}
          isBulletList={true}
          onKeyDown={handleKeyDown(2)}
          ref={registerEditor(2)}
        />
      </div>

      <button
        onClick={() => setData((prev) => ({ ...prev, showImplementation: !prev.showImplementation }))}
        className={styles.addImplementation}
      >
        <h4 className={styles.realizationTitle}>
          {storyData.showImplementation ? "- Скрыть реализацию" : "+ Реализация"}
        </h4>
      </button>

      {storyData.showImplementation && (
        <div>
          <BaseEditor
            placeholder="Описание подхода к решению, технически скрытых от пользователя деталей. Например, какие нужно использовать библиотеки, подход к архитектуре или хранению данных."
            content={storyData.implementation}
            onUpdate={updateField("implementation")}
            onKeyDown={handleKeyDown(3)}
            ref={registerEditor(3)}
          />
        </div>
      )}
    </div>
  )
}

