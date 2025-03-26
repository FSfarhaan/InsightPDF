import React, { useState } from "react";
import {
  X,
  UploadCloud,
  MessageSquare,
  BrainCircuit,
  ArrowLeft,
  CheckCircle,
  Link2,
  FileText,
} from "lucide-react";

const UploadModal = ({
  isOpen,
  onClose,
  setFile = null,
  type,
}) => {
  const [screen, setScreen] = useState("initial");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  if (!isOpen) return null;

  // Reset all states when closing
  const handleClose = () => {
    setScreen("initial");
    setSelectedFiles([]);
    setUploadSuccess(false);
    setSelectedOption(null);
    onClose();
  };

  // Handle File Selection
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setSelectedFiles(files);
      setUploadSuccess(false); // Reset upload state
    }
  };

  // Handle Upload Click
  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      // Your existing upload logic here
      setUploadSuccess(true);
    } else {
      alert("Please select file(s) before uploading!");
    }
  };

  // Initial screen with 4 options
  const InitialScreen = () => (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Choose Your Analysis Option
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {[
          { 
            icon: <FileText />, 
            label: "Text Extraction", 
            value: "textExtraction",
            color: "blue" 
          },
          { 
            icon: <MessageSquare />, 
            label: "Chatbot", 
            value: "chatbot",
            color: "green" 
          },
          { 
            icon: <BrainCircuit />, 
            label: "Knowledge Graph", 
            value: "knowledgeGraph",
            color: "purple" 
          },
          { 
            icon: <Link2 />, 
            label: "Correlations", 
            value: "correlations",
            color: "red" 
          }
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => {
              setSelectedOption(option.value);
              setScreen("upload");
            }}
            className={`flex flex-col items-center justify-center p-6 border-2 rounded-lg 
              hover:bg-${option.color}-50 hover:border-${option.color}-500 transition
              ${selectedOption === option.value 
                ? `bg-${option.color}-100 border-${option.color}-500` 
                : 'border-gray-300 bg-white'}`}
          >
            {React.cloneElement(option.icon, { 
              className: `w-10 h-10 mb-3 text-${option.color}-600` 
            })}
            <span className="font-medium text-gray-800">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  // Upload Screen
  const UploadScreen = () => (
    <>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {selectedOption === 'correlations' 
          ? 'Upload Documents for Correlation Analysis' 
          : `Upload Document for ${selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)}`}
      </h2>

      {/* File Upload Box */}
      <label
        htmlFor="fileUpload"
        className="border-2 border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
      >
        <UploadCloud className="w-12 h-12 text-gray-500 mb-4" />
        <p className="text-gray-600 text-lg font-medium">
          {selectedOption === 'correlations' 
            ? 'Drag & Drop multiple files here' 
            : 'Drag & Drop your file here'}
        </p>
        <p className="text-gray-400 text-sm mt-2">
          or <span className="text-blue-600 underline">click to browse</span>
        </p>
        <input
          id="fileUpload"
          type="file"
          multiple={selectedOption === 'correlations'}
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {/* Show Uploaded File Names */}
      {selectedFiles.length > 0 && (
        <div className="mt-3 max-h-32 overflow-y-auto">
          <p className="text-gray-500 text-sm mb-2">
            Selected File{selectedFiles.length > 1 ? 's' : ''}:
          </p>
          {selectedFiles.map((file, index) => (
            <div 
              key={index} 
              className="flex justify-between items-center bg-gray-100 p-2 rounded mb-1"
            >
              <span className="text-gray-700 text-sm">{file.name}</span>
              <button 
                onClick={() => {
                  const newFiles = selectedFiles.filter((_, i) => i !== index);
                  setSelectedFiles(newFiles);
                }}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Success Checkmark */}
      {uploadSuccess && (
        <div className="flex items-center justify-center mt-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
          <p className="text-green-600 font-medium ml-2">
            Upload Successful
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-between space-x-4 mt-6">
        <button
          onClick={() => setScreen("initial")}
          className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg"
        >
          Back
        </button>

        <div className="flex space-x-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg"
          >
            Cancel
          </button>

          {!uploadSuccess ? (
            <button
              onClick={handleUpload}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
              disabled={selectedFiles.length === 0}
            >
              Upload
            </button>
          ) : (
            <button
              onClick={() => {
                // Logic for next step based on selected option
                switch(selectedOption) {
                  case 'textExtraction':
                    console.log('Text Extraction');
                    break;
                  case 'chatbot':
                    console.log('Open Chatbot');
                    break;
                  case 'knowledgeGraph':
                    console.log('Generate Knowledge Graph');
                    break;
                  case 'correlations':
                    console.log('Show Correlations');
                    break;
                }
                handleClose();
              }}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white w-1/2 max-w-2xl p-6 rounded-xl shadow-lg relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={handleClose}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Render different screens */}
        {screen === "initial" && <InitialScreen />}
        {screen === "upload" && <UploadScreen />}
      </div>
    </div>
  );
};

export default UploadModal;