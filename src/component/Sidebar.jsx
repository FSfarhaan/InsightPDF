import React from 'react'
import { FolderIcon, LayoutDashboard, MessageCircle, Activity, GitGraph, Link2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const Sidebar = () => {
    const params = useParams();
    const storageData = [
      { label: "Photo", size: "11 GB", color: "bg-blue-500" },
      { label: "Video", size: "19 GB", color: "bg-red-500" },
      { label: "Document", size: "25 GB", color: "bg-green-500" },
      { label: "Free Storage", size: "45 GB", color: "bg-gray-300" },
    ];
  
    return (
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="flex items-center mb-6">
        <div className="w-9 h-9 md:mr-3 mr-2 border bg-purple-950 border-gray-600 p-2 rounded-full">
              <img src="/devflow_logo.png" alt="Devflow Logo" />
        </div>
          <span className="text-xl font-semibold text-black">Devflow</span>
        </div>
  
        <div className="space-y-2">
            {[
                { label: "Dashboard", icon: <LayoutDashboard />, path: "/" },
                { label: "Chatbots", icon: <MessageCircle />, path: "/chat" },
                { label: "Knowledge Graph", icon: <GitGraph />, path: "/knowledge" },
                { label: "Predictive Analysis", icon: <Activity />, path: "/predictive" },
                { label: "Corelations", icon: <Link2 />, path: "/corelations" }
            ].map(({ label, icon, path }) => (
                <Link
                key={label}
                to={path}
                className={`w-full text-gray-700 p-2 rounded-lg flex items-center hover:bg-gray-200 transition ${params === path ? "bg-purple-800 text-white" : ""}`}
                >
                {React.cloneElement(icon, { className: "w-5 h-5 mr-2" })}
                {label}
                </Link>
            ))}
            </div>
  
        <div className="mt-8">
          <h3 className="text-gray-500 mb-2">Folders</h3>
          {["Landing Page", "Mobile", "Dashboard", "Footer"].map((folder) => (
            <div key={folder} className="flex items-center text-gray-700 p-2">
              <FolderIcon className="w-5 h-5 text-yellow-400 mr-2" />
              {folder}
            </div>
          ))}
        </div>

      </div>
    );
  };

export default Sidebar
