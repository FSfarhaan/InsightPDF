import ChatScreen from './pages/Chatscreen'
import Sidebar from './component/Sidebar'
import KnowledgeGraph from './pages/KnowledgeGraphScreen'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-full'>
        {/* <KnowledgeGraph /> */}
        <ChatScreen />
        {/* <Dashboard /> */}
      </div>
    </div>
  )
}

export default App
