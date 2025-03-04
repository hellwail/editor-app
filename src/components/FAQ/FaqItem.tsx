import { BaseEditor } from "../BaseEditor"
import { useEditorNavigation } from "../UseEditorNavigation"

interface FaqItemProps {
  questionPlaceholder?: string
  answerPlaceholder?: string
  index: number
  totalItems: number
  onNavigate: (direction: "up" | "down", currentIndex: number) => void
  onDelete: (index: number) => void
  onContentChange: (index: number, type: "question" | "answer", content: string) => void
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
  initialAnswer,
}: FaqItemProps) {
  const { registerEditor, handleKeyDown } = useEditorNavigation()

  const handleQuestionKeyDown = (event: KeyboardEvent) => {
    handleKeyDown(index * 2)(event)
    if (event.key === "ArrowUp" && index > 0) {
      onNavigate("up", index)
    }
  }

  const handleAnswerKeyDown = (event: KeyboardEvent) => {
    handleKeyDown(index * 2 + 1)(event)
    if (event.key === "ArrowDown" && index < totalItems - 1) {
      onNavigate("down", index)
    }
  }

  return (
    <div className="faq-item">
      <div className="drag-handle">::</div>
      <div className="faq-content">
        <div className="faq-question">
          <BaseEditor
            placeholder={questionPlaceholder}
            content={initialQuestion}
            onUpdate={(content) => onContentChange(index, "question", content)}
            onKeyDown={handleQuestionKeyDown}
            ref={registerEditor(index * 2)}
          />
        </div>
        <div className="faq-answer">
          <BaseEditor
            placeholder={answerPlaceholder}
            content={initialAnswer}
            onUpdate={(content) => onContentChange(index, "answer", content)}
            onKeyDown={handleAnswerKeyDown}
            ref={registerEditor(index * 2 + 1)}
          />
        </div>
        <button className="delete-faq-button" onClick={() => onDelete(index)} title="Удалить вопрос">
          X
        </button>
      </div>
    </div>
  )
}

