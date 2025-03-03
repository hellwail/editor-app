
import { FAQ } from './components/FAQ'
import UserStoryEditor from './components/UserStoryEditor'
import EditorToggle from './components/EditorToggle'
import './App.css'
import { useState, useEffect } from 'react'

type EditorType = 'faq' | 'userstory' 


function App() {
  const [activeEditor, setActiveEditor] = useState<EditorType>(() => {
    return (localStorage.getItem('activeEditor') as EditorType) || 'faq'
  })

  useEffect(() => {
    localStorage.setItem('activeEditor', activeEditor)
  }, [activeEditor])

  const getTitle = () => {
    switch(activeEditor) {
      case 'faq': return 'Awesome FAQ Editor'
      case 'userstory': return 'Awesome User Story Editor'
    }
  }

  return (
    <div className="app">
    <div className="header">
      <h1 className='title'>{getTitle()}</h1>
      <EditorToggle 
        activeEditor={activeEditor} 
        onToggle={setActiveEditor} 
      />
    </div>
    {activeEditor === 'faq' ? <FAQ /> :
     <UserStoryEditor /> 
     }
  </div>
  )
}

export default App
