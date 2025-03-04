
import { FAQ } from './components/FAQ/FAQ'
import UserStoryEditor from './components/UserStory/UserStoryEditor'
import EditorToggle from './components/EditorToggle'
import './App.css'
import { useState, useEffect } from 'react'
import ResumeEditor from './components/Resume/ResumeEditor'

type EditorType = 'faq' | 'userstory'  | 'resume'


function App() {
  const [activeEditor, setActiveEditor] = useState<EditorType>(() => {
    return (localStorage.getItem('activeEditor') as EditorType) 
  })

  useEffect(() => {
    localStorage.setItem('activeEditor', activeEditor)
  }, [activeEditor])

  return (
    <div className="app">
    <div className="header">
      <EditorToggle 
        activeEditor={activeEditor} 
        onToggle={setActiveEditor} 
      />
    </div>
    {activeEditor === 'faq' ? <FAQ /> :
      activeEditor === 'userstory' ? <UserStoryEditor /> :
    <ResumeEditor />}
  </div>
  )
}

export default App
