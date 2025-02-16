// Dashboard.jsx
import React, { useState } from "react";

import {
  Upload,
} from "lucide-react";
import UploadModal from "../component/UploadModal";
import FileListingTable from "../component/FilesTable";

const Dashboard = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 p-8">
      <MainContent
        onUploadClick={() => setIsUploadModalOpen(true)}
      />
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        type={"dashboard"}
      />
    </div>
  );
};

const MainContent = ({ onUploadClick }) => {
  return (
    <div className="w-full p-4 ">

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
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-gray-200 transition cursor-pointer"
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
        <div onClick={onUploadClick} className="p-4 rounded-lg shadow-sm hover:shadow-lg transition cursor-pointer border border-dark flex flex-col items-center" style={{border: "1px solid #a9a9a980"}}>
          <div className=" p-4 rounded-lg w-full flex justify-center bg-white">
            <img src="/legal.png" alt="" />
          </div>

          <span className="text-gray-700 font-medium mt-2">
            Legal Contracts
          </span>
        </div>
        <div onClick={onUploadClick} className="p-4 rounded-lg shadow-sm hover:shadow-lg transition cursor-pointer border border-dark flex flex-col items-center" style={{border: "1px solid #a9a9a980"}}>
          <div className=" p-4 rounded-lg w-full flex justify-center bg-white">
            <img src="/financial.jpg" alt="" />
          </div>

          <span className="text-gray-700 font-medium mt-2">
            Financial Reports
          </span>
        </div>
        <div onClick={onUploadClick}  className="p-4 rounded-lg shadow-sm hover:shadow-lg transition cursor-pointer border border-dark flex flex-col items-center" style={{border: "1px solid #a9a9a980"}}>
          <div className="p-4 rounded-lg w-full flex justify-center bg-white">
            <img src="/technical.jpg" alt="" />
          </div>

          <span className="text-gray-700 font-medium mt-2">
            Technical Manuals
          </span>
        </div>
        <div onClick={onUploadClick} className="p-4 rounded-lg shadow-sm hover:shadow-lg transition cursor-pointer border border-dark flex flex-col items-center" style={{border: "1px solid #a9a9a980"}}>
          <div className="p-4 rounded-lg w-full flex justify-center bg-white">
            <img src="/research.jpg" alt="" />
          </div>

          <span className="text-gray-700 font-medium mt-2">
            Research Papers
          </span>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-4 mt-8 text-black">
        Recent files
      </h2>
      <FileListingTable />
    </div>
  );
};


export default Dashboard;
