import { useRef, useCallback } from "react"
import type { BaseEditorRef } from "./BaseEditor"

export function useEditorNavigation() {
  const editorRefs = useRef<(BaseEditorRef | null)[]>([])

  const registerEditor = useCallback(
    (index: number) => (el: BaseEditorRef | null) => {
      editorRefs.current[index] = el
    },
    [],
  )

  const handleKeyDown = useCallback(
    (index: number) => (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" && index > 0) {
        event.preventDefault()
        editorRefs.current[index - 1]?.focus()
      } else if (event.key === "ArrowDown" && index < editorRefs.current.length - 1) {
        event.preventDefault()
        editorRefs.current[index + 1]?.focus()
      }
    },
    [],
  )

  return { registerEditor, handleKeyDown }
}

