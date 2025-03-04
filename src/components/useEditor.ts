import { useState, useCallback } from "react"

export function useEditor<T>(initialState: T) {
  const [data, setData] = useState<T>(initialState)

  const updateField = useCallback(
    (field: keyof T) => (content: string) => {
      setData((prev) => ({
        ...prev,
        [field]: content,
      }))
    },
    [],
  )

  return { data, updateField, setData }
}