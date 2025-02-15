import React, { useState } from "react";
import { motion } from "framer-motion";

const CreateFolderModal = ({ isOpen, onClose, onCreate }) => {
  const [folderName, setFolderName] = useState("");

  const handleCreate = () => {
    if (folderName.trim() !== "") {
      onCreate(folderName);
      setFolderName("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white p-6 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
          📂 Create New Folder
        </h2>
        
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Enter folder name..."
          className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <div className="flex justify-end space-x-3 mt-5">
          <button 
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition" 
            onClick={onClose}
          >
            Cancel
          </button>
          
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition shadow-md" 
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateFolderModal;
