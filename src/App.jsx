import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";
import Sidebar from "./component/Sidebar";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Chatscreen = lazy(() => import("./pages/Chatscreen"));
const KnowledgeGraphScreen = lazy(() => import("./pages/KnowledgeGraphScreen"));
const Statistics = lazy(() => import("./pages/StatisticsDashboard"));

function App() {

  return (
    <Router>
      <div className='flex'>
        <Sidebar />
        <div className='w-full'>
        <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/chat" element={<Chatscreen />} />
              <Route path="/knowledge" element={<KnowledgeGraphScreen />} />
              <Route path="/analysis" element={<Statistics />} />

              <Route path="*" element={<h1 className="text-center mt-10">404 - Not Found</h1>} />
            </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
