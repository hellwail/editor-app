import React from 'react'

type EditorType = 'faq' | 'userstory'

interface EditorToggleProps {
  activeEditor: EditorType
  onToggle: (type: EditorType) => void
}

const EditorToggle: React.FC<EditorToggleProps> = ({ activeEditor, onToggle }) => {
  return (
    <div className="editor-toggle">
      <button 
        className={`toggle-btn ${activeEditor === 'faq' ? 'active' : ''}`}
        onClick={() => onToggle('faq')}
      >
        FAQ Editor
      </button>
      <button 
        className={`toggle-btn ${activeEditor === 'userstory' ? 'active' : ''}`}
        onClick={() => onToggle('userstory')}
      >
        User Story
      </button>
    </div>
  )
}

export default EditorToggle 