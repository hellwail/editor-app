import { useState, useRef, useEffect } from "react"
import { FaqItem } from "./FaqItem"
import "../../App.css"

interface FaqData {
  id: number
  question: string
  answer: string
}

export function FAQ() {
  const [faqItems, setFaqItems] = useState<FaqData[]>(() => {
    const saved = localStorage.getItem("faqItems")
    return saved ? JSON.parse(saved) : [{ id: 1, question: "", answer: "" }]
  })
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const faqRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    localStorage.setItem("faqItems", JSON.stringify(faqItems))
  }, [faqItems])

  const addNewFaqItem = () => {
    setFaqItems([...faqItems, { id: Date.now(), question: "", answer: "" }])
  }

  const handleContentChange = (index: number, type: "question" | "answer", content: string) => {
    const newFaqItems = [...faqItems]
    newFaqItems[index] = {
      ...newFaqItems[index],
      [type]: content,
    }
    setFaqItems(newFaqItems)
  }

  const handleDelete = (index: number) => {
    if (faqItems.length > 1) {
      setFaqItems(faqItems.filter((_, i) => i !== index))
    }
  }

  const handleNavigate = (direction: "up" | "down", currentIndex: number) => {
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1

    if (targetIndex >= 0 && targetIndex < faqItems.length) {
      const targetElement = faqRefs.current[targetIndex]?.querySelector(".ProseMirror")
      if (targetElement instanceof HTMLElement) {
        targetElement.focus()
      }
    }
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null) return

    const draggedOverItem = faqRefs.current[index]
    if (!draggedOverItem) return

    draggedOverItem.style.borderTop = draggedIndex < index ? "2px solid #666" : "none"
    draggedOverItem.style.borderBottom = draggedIndex > index ? "2px solid #666" : "none"
  }

  const handleDragLeave = (index: number) => {
    const item = faqRefs.current[index]
    if (item) {
      item.style.borderTop = "none"
      item.style.borderBottom = "none"
    }
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (draggedIndex === null) return

    const newFaqItems = [...faqItems]
    const [draggedItem] = newFaqItems.splice(draggedIndex, 1)
    newFaqItems.splice(dropIndex, 0, draggedItem)
    setFaqItems(newFaqItems)
    setDraggedIndex(null)

    faqRefs.current.forEach((ref) => {
      if (ref) {
        ref.style.borderTop = "none"
        ref.style.borderBottom = "none"
      }
    })
  }

  return (
    <div className="faq-editor">
      <h1 className="title">FAQ Editor</h1>
      <div className="faq-list">
        {faqItems.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              faqRefs.current[index] = el
            }}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={() => handleDragLeave(index)}
            onDrop={(e) => handleDrop(e, index)}
            className={draggedIndex === index ? "faq-item-dragging" : ""}
          >
            <FaqItem
              index={index}
              totalItems={faqItems.length}
              onNavigate={handleNavigate}
              onDelete={handleDelete}
              onContentChange={handleContentChange}
              initialQuestion={item.question}
              initialAnswer={item.answer}
            />
          </div>
        ))}
      </div>
      <button onClick={addNewFaqItem} className="btn add-btn">
        Добавить вопрос
      </button>
    </div>
  )
}

