import React, { useState, useEffect } from "react";
import {
  X,
  UploadCloud,
  MessageSquare,
  BrainCircuit,
  ArrowLeft,
  CheckCircle,
  BarChart,
  BoxSelectIcon,
} from "lucide-react";
import axios from "axios";

const UploadModal = ({
  isOpen,
  onClose,
  showExtra = true,
  setFile = null,
  type,
}) => {
  const [screen, setScreen] = useState("upload");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [filesData, setFilesData] = useState([]);
  const [selectedDataType, setSelectedDataType] = useState(null);
  // const BACKEND = showExtra ? "https://e96b-2409-40c0-100c-34f2-403a-a081-6994-d507.ngrok-free.app/upload-doc" : "https://e226-2409-40c0-100c-34f2-8caf-983a-a8f8-5c63.ngrok-free.app/upload"
  const AYUSH_BACKEND = import.meta.env.VITE_PYTHON_AYUSH;
  const SAKSHI_BACKEND = import.meta.env.VITE_PYTHON_SAKSI;

  const BACKEND =
    type === "dashboard"
      ? `${AYUSH_BACKEND}/upload-doc`
      : type === "knowledge"
      ? `${SAKSHI_BACKEND}/upload`
      : type === "stats"
      ? `${SAKSHI_BACKEND}/uploadpa`
      : "";

  if (!isOpen) return null;

  // Reset all states when closing
  const handleClose = () => {
    setScreen("upload");
    setSelectedFile(null);
    setUploadSuccess(false);
    onClose();
  };

  // Handle File Selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadSuccess(false); // Reset upload state
    }
  };

  // Handle Upload Click
  const handleUpload = () => {
    if (selectedFile) {
      console.log("Selected File:", selectedFile);

      setFile(selectedFile);

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("session_id", "1234");
      formData.append("model", "llama3-70b-8192");

      fetch(`${BACKEND}`, {
        method: "POST", // Or "PUT" if required
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));

      // Clear file selection
      setSelectedFile(null);
      setUploadSuccess(true);
    } else {
      alert("Please select a file before uploading!");
    }
  };

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

        {/* Back Button (Appears on Chatbot, Knowledge Graph, and Predictive Analysis screens) */}
        {screen !== "upload" && (
          <button
            className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 flex items-center"
            onClick={() => setScreen("upload")}
          >
            <ArrowLeft className="w-5 h-5 mr-1" /> Back
          </button>
        )}

        {/* Upload Document Screen */}
        {screen === "upload" && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Upload Document
            </h2>

            {/* Data Type Selection */}
            <div className="flex space-x-4 mb-4">
              <div
                className={`border-2 rounded-lg p-6 flex flex-col items-center justify-center w-1/2 cursor-pointer transition ${
                  selectedDataType === "structured"
                    ? "bg-green-200 border-green-600"
                    : "border-gray-300 bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() =>
                  setSelectedDataType((prev) =>
                    prev === "structured" ? null : "structured"
                  )
                }
              >
                <p className="text-gray-700 font-medium">Structured Data</p>
                {/* Placeholder for Image */}
                <div className="w-20 h-20 mt-2">
                  <img src="/structured.png" alt="" />
                </div>
              </div>

              <div
                className={`border-2 rounded-lg p-6 flex flex-col items-center justify-center w-1/2 cursor-pointer transition ${
                  selectedDataType === "unstructured"
                    ? "bg-green-200 border-green-600"
                    : "border-gray-300 bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() =>
                  setSelectedDataType((prev) =>
                    prev === "unstructured" ? null : "unstructured"
                  )
                }
              >
                <p className="text-gray-700 font-medium">Unstructured Data</p>
                {/* Placeholder for Image */}
                <div className="w-20 h-20 mt-2">
                  <img src="/unstructured.png" alt="" />
                </div>
              </div>
            </div>

            {/* File Upload Box */}
            <label
              htmlFor="fileUpload"
              className="border-2 border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
            >
              <UploadCloud className="w-12 h-12 text-gray-500 mb-4" />
              <p className="text-gray-600 text-lg font-medium">
                Drag & Drop your files here
              </p>
              <p className="text-gray-400 text-sm mt-2">
                or{" "}
                <span className="text-blue-600 underline">click to browse</span>
              </p>
              <input
                id="fileUpload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {/* Show Uploaded File Name */}
            {selectedFile && (
              <p className="text-gray-500 text-sm mt-3">
                Selected File: {selectedFile.name}
              </p>
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
            <div className="flex justify-end space-x-4 mt-6">
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
                >
                  Upload
                </button>
              ) : (
                <button
                  onClick={handleClose}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow"
                >
                  Next
                </button>
              )}
            </div>
          </>
        )}

        {screen === "options" && showExtra && (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Choose an option:
            </h2>
            {selectedFile && (
              <p className="text-gray-500 text-sm mb-3">
                Uploaded: {selectedFile.name}
              </p>
            )}

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setScreen("chatbot")}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Chatbot
              </button>

              <button
                onClick={() => setScreen("knowledgeGraph")}
                className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow"
              >
                <BrainCircuit className="w-5 h-5 mr-2" />
                Knowledge Graph
              </button>

              <button
                onClick={() => setScreen("predictiveAnalysis")}
                className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition shadow"
              >
                <BarChart className="w-5 h-5 mr-2" />
                Predictive Analysis
              </button>
            </div>
          </div>
        )}

        {/* Chatbot Screen */}
        {/* {screen === "chatbot" && (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Chatbot</h2>
            <p className="text-gray-600">This is the chatbot interface.</p>
          </div>
        )} */}

        {/* Predictive Analysis Screen */}
        {/* {screen === "predictiveAnalysis" && (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Predictive Analysis</h2>
            <p className="text-gray-600">Try Predictive Analysis.</p>
          </div>
        )} */}

        {/* Knowledge Graph Screen */}
        {/* {screen === "knowledgeGraph" && (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Knowledge Graph</h2>
            <p className="text-gray-600">This is the knowledge graph interface.</p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default UploadModal;
