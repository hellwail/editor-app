import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect, useRef } from 'react'

interface FaqItemProps {
  questionPlaceholder?: string
  answerPlaceholder?: string
  index: number
  totalItems: number
  onNavigate: (direction: 'up' | 'down', currentIndex: number) => void
  onDelete: (index: number) => void
  onContentChange: (index: number, type: 'question' | 'answer', content: string) => void
  initialQuestion: string
  initialAnswer: string
}

export function FaqItem({ 
  questionPlaceholder = "Введите вопрос...",
  answerPlaceholder = "Введите ответ...",
  index,
  totalItems,
  onNavigate,
  onDelete,
  onContentChange,
  initialQuestion,
  initialAnswer
}: FaqItemProps) {
  const questionRef = useRef<HTMLDivElement>(null)
  const answerRef = useRef<HTMLDivElement>(null)

  const questionEditor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: questionPlaceholder,
      }),
    ],
    content: initialQuestion,
    onUpdate: ({ editor }) => {
      onContentChange(index, 'question', editor.getHTML())
    }
  })

  const answerEditor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: answerPlaceholder,
      }),
    ],
    content: initialAnswer,
    onUpdate: ({ editor }) => {
      onContentChange(index, 'answer', editor.getHTML())
    }
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!questionEditor || !answerEditor) return

      const isQuestionFocused = questionEditor.isFocused
      const isAnswerFocused = answerEditor.isFocused

      if (!isQuestionFocused && !isAnswerFocused) return

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (isAnswerFocused) {
          questionEditor.commands.focus()
        } else if (isQuestionFocused && index > 0) {
          onNavigate('up', index)
        }
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (isQuestionFocused) {

          answerEditor.commands.focus()
        } else if (isAnswerFocused && index < totalItems - 1) {
          onNavigate('down', index)
        }
      }
    }

    if (questionRef.current) {
      questionRef.current.addEventListener('keydown', handleKeyDown)
    }
    if (answerRef.current) {
      answerRef.current.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      if (questionRef.current) {
        questionRef.current.removeEventListener('keydown', handleKeyDown)
      }
      if (answerRef.current) {
        answerRef.current.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [questionEditor, answerEditor, index, totalItems, onNavigate])

  return (
    <div className="faq-item">
      <div className="drag-handle">::</div>
      <div className="faq-content">
        <div className="faq-question" ref={questionRef}>
          <EditorContent editor={questionEditor} />
        </div>
        <div className="faq-answer" ref={answerRef}>
          <EditorContent editor={answerEditor} />
        </div>
        <button 
          className="delete-faq-button"
          onClick={() => onDelete(index)}
          title="Удалить вопрос"
        >
          X
        </button>
      </div>
    </div>
  )
}