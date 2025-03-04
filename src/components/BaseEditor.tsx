import { useRef, useImperativeHandle, forwardRef } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import styles from "./UserStory/user-story.module.css"

export interface BaseEditorProps {
  placeholder: string
  content: string
  onUpdate: (content: string) => void
  isBulletList?: boolean
  onKeyDown?: (event: KeyboardEvent) => void
}

export interface BaseEditorRef {
  focus: () => void
}

export const BaseEditor = forwardRef<BaseEditorRef, BaseEditorProps>(
  ({ placeholder, content, onUpdate, isBulletList = false, onKeyDown }, ref) => {
    const editorRef = useRef<HTMLDivElement>(null)

    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          bulletList: {
            keepMarks: true,
            keepAttributes: false,
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
      editorProps: {
        handleKeyDown: (view, event) => {
          if (isBulletList) {
            if (event.key === "Enter" && !editor?.isEmpty) {
              event.preventDefault()
              if (!editor?.isActive("bulletList")) {
                editor?.commands.toggleBulletList()
              }
              editor?.commands.splitListItem("listItem")
              return true
            }
          }
          if (onKeyDown) {
            onKeyDown(event as KeyboardEvent)
          }
          return false
        },
      },
    })

    useImperativeHandle(ref, () => ({
      focus: () => {
        editor?.commands.focus()
      },
    }))

    return (
      <div className={styles.editorWrapper} ref={editorRef}>
        <EditorContent editor={editor} className={styles.editor} />
      </div>
    )
  },
)

BaseEditor.displayName = "BaseEditor"

