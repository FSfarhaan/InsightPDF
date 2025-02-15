import React from "react";
import { Folder } from "lucide-react";

const FolderGrid = ({ folders }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      {folders.map((folder, index) => (
        <div key={index} className="flex items-center space-x-2 bg-gray-100 p-4 rounded-lg shadow">
          <Folder className="w-6 h-6 text-gray-600" />
          <span className="text-gray-800 font-medium">{folder}</span>
        </div>
      ))}
    </div>
  );
};

export default FolderGrid;
