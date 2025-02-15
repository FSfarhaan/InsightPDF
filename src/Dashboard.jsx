// Dashboard.jsx
import React, { useState } from "react";
import {
  FolderIcon, StarIcon, ShareIcon, TrashIcon, SettingsIcon,
  Search, Bell, Plus, Upload, FolderPlus, Filter, MoreVertical
} from "lucide-react";
import UploadModal from "./UploadModal";
import CreateFolderModal from "./CreateFolderPage";

const Dashboard = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [folders, setFolders] = useState([
    "UI UX Design", "Legal Docs", "Reports", "Presentations",
    "Documents", "Template", "Important", "Meetings",
    "Resources", "Client Files"
  ]);

  const handleCreateFolder = (folderName) => {
    setFolders([...folders, folderName]);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <MainContent 
        folders={folders}
        onUploadClick={() => setIsUploadModalOpen(true)}
        onCreateFolderClick={() => setIsCreateFolderModalOpen(true)}
      />
      <UploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
      />
      <CreateFolderModal 
        isOpen={isCreateFolderModalOpen}
        onClose={() => setIsCreateFolderModalOpen(false)}
        onCreate={handleCreateFolder}
      />
    </div>
  );
};

const Sidebar = () => {
  const storageData = [
    { label: "Photo", size: "11 GB", color: "bg-blue-500" },
    { label: "Video", size: "19 GB", color: "bg-red-500" },
    { label: "Document", size: "25 GB", color: "bg-green-500" },
    { label: "Free Storage", size: "45 GB", color: "bg-gray-300" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 bg-gray-900 rounded-lg mr-2"></div>
        <span className="text-xl font-semibold">Cloudnest</span>
      </div>
      <div className="space-y-2">
        {[
          { label: "All Files", icon: <FolderIcon /> },
          { label: "Favorite", icon: <StarIcon /> },
          { label: "Shared Files", icon: <ShareIcon /> },
          { label: "Delete Files", icon: <TrashIcon /> },
          { label: "Settings", icon: <SettingsIcon /> },
        ].map(({ label, icon }) => (
          <button 
            key={label} 
            className="w-full text-gray-700 p-2 rounded-lg flex items-center hover:bg-gray-100"
          >
            {React.cloneElement(icon, { className: "w-5 h-5 mr-2" })}
            {label}
          </button>
        ))}
      </div>
      <div className="mt-8">
        <h3 className="text-gray-500 mb-2">Folders</h3>
        {["Landing Page", "Mobile", "Dashboard", "Footer"].map((folder) => (
          <div 
            key={folder} 
            className="flex items-center text-gray-700 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <FolderIcon className="w-5 h-5 text-yellow-400 mr-2" />
            {folder}
          </div>
        ))}
      </div>
      <div className="mt-8 space-y-4">
        {storageData.map(({ label, size, color }) => (
          <div key={label} className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <div className={`w-3 h-3 ${color} rounded-full mr-2`}></div>
              <span>{label}</span>
            </div>
            <span className="text-gray-500">{size}</span>
          </div>
        ))}
        <div className="mt-4 bg-gray-200 h-2 rounded-full">
          <div className="bg-gray-800 h-full w-3/4 rounded-full"></div>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          <span>55GB used</span> <span className="mx-1">of</span> <span>100GB</span>
        </div>
        <button className="w-full bg-gray-900 text-white p-2 rounded-lg hover:bg-gray-800 transition">
          Upgrade Premium
        </button>
      </div>
    </div>
  );
};

const MainContent = ({ folders, onUploadClick, onCreateFolderClick }) => {
  return (
    <div className="flex-1 p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search files and folders"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition">
            <Plus className="w-5 h-5 mr-2" />
            Invite member
          </button>
        </div>
      </div>

      <h1 className="text-2xl font-semibold mb-1">Welcome back, Martin Mickael</h1>
      <p className="text-gray-500 mb-6">Welcome back! Let's continue your activity on the dashboard.</p>

      <div className="flex justify-end items-center mb-6 space-x-4">
        <button
          onClick={onCreateFolderClick}
          className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
        >
          <FolderPlus className="w-5 h-5 mr-2" />
          Create folder
        </button>
        <button
          onClick={onUploadClick}
          className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
        >
          <Upload className="w-5 h-5 mr-2" />
          Upload files
        </button>
      </div>

      <FolderGrid folders={folders} />
      
      <h2 className="text-lg font-semibold mt-8 mb-4">Suggested from your activity</h2>
      <div className="grid grid-cols-4 gap-4">
        {["DOCX", "JPG", "PDF", "PNG"].map((type) => (
          <div key={type} className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="w-full aspect-square bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg mb-2"></div>
            <span className="text-gray-700 font-medium">{type}</span>
          </div>
        ))}
      </div>

      <FileTable />
    </div>
  );
};

const FolderGrid = ({ folders }) => {
  return (
    <div className="grid grid-cols-5 gap-4">
      {folders.map((folder) => (
        <div 
          key={folder} 
          className="p-4 bg-white shadow-sm hover:shadow-md transition rounded-lg flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center">
            <FolderIcon className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-gray-700">{folder}</span>
          </div>
          <MoreVertical className="w-5 h-5 text-gray-400" />
        </div>
      ))}
    </div>
  );
};

const FileTable = () => {
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Your Files</h2>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Filter className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      <div className="border border-gray-200 rounded-lg p-8 bg-white text-center">
        <p className="text-gray-500">No recent files available</p>
      </div>
    </div>
  );
};

export default Dashboard;