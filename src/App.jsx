import { useState } from 'react'
import ChatScreen from './pages/Chatscreen'
import Sidebar from './component/Sidebar'
import KnowledgeGraph from './pages/KnowledgeGraphScreen'

function App() {

  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-full'>
        <KnowledgeGraph />
        <ChatScreen />
      </div>
    </div>
  )
}

export default App
