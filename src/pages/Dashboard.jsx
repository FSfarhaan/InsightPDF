import React, { useState } from "react";
import {
  Upload,
} from "lucide-react";
import UploadModal from "../component/UploadModal";
import FileListingTable from "../component/FilesTable";

const App = () => {
  const scrollToDashboard = () => {
    document.getElementById("dashboard").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full">
     {/* Hero Section */}
<div className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Background Image */}
  <div 
    className="absolute inset-0 bg-cover bg-center z-0" 
    style={{ 
      backgroundImage: "url('/background_web.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      zIndex: -1
    }}
  />
  
  {/* Black Overlay */}
  <div className="absolute inset-0 bg-black opacity-50 z-0" />

  {/* Content */}
  <div className="relative z-10 container mx-auto px-6 py-16 text-center">
    <div className="max-w-3xl mx-auto">
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
        AI Research Assistant
      </h1>
      <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
        Your AI-powered partner for research and discovery, helping you analyze complex data, extract key insights, and drive innovation with intelligent automation.
      </p>
      {/* Scroll Button */}
      <button 
        className="bg-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/30 transition"
        onClick={scrollToDashboard}
      >
        Explore
      </button>
    </div>
  </div>
</div>


      {/* Dashboard Section */}
      <div id="dashboard">
        <Dashboard />
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [file, setFile] = useState(null);

  return (
    <div className="flex min-h-screen bg-gray-50 p-8">
      <MainContent
        onUploadClick={() => setIsUploadModalOpen(true)}
      />
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        type={"dashboard"}
        setFile={setFile}
      />
    </div>
  );
};

const MainContent = ({ onUploadClick }) => {
  return (
    <div className="w-full p-4">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-1 text-black">
            Welcome back, Farhaan Shaikh
          </h1>
          <p className="text-gray-500 mb-6">
            Welcome back! Let's continue your activity on the dashboard.
          </p>
        </div>

        <div className="flex justify-end items-center mb-6 space-x-4">
          <button
            onClick={onUploadClick}
            className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-800 transition cursor-pointer"
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload files
          </button>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-4 text-black">
        Upload file type
      </h2>
      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: "/legal.png", label: "Legal Contracts" },
          { icon: "/financial.jpg", label: "Financial Reports" },
          { icon: "/technical.jpg", label: "Technical Manuals" },
          { icon: "/research.jpg", label: "Research Papers" }
        ].map((item, index) => (
          <div 
            key={index} 
            onClick={onUploadClick} 
            className="p-4 rounded-lg shadow-sm hover:shadow-lg transition cursor-pointer border border-dark flex flex-col items-center" 
            style={{border: "1px solid #a9a9a980"}}
          >
            <div className="p-4 rounded-lg w-full flex justify-center bg-white">
              <img src={item.icon} alt={item.label} />
            </div>
            <span className="text-gray-700 font-medium mt-2">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-4 mt-8 text-black">
        Recent files
      </h2>
      <FileListingTable />
    </div>
  );
};

export default App;