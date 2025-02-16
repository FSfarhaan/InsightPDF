import React, { useState } from "react";
import { Upload, Button, Select, message, Card } from "antd";
import { InboxOutlined, CheckCircleOutlined, FileTextOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const { Option } = Select;

const KnowledgeGraph = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [storedFiles, setStoredFiles] = useState(["Document1.pdf", "ResearchPaper.pdf", "GraphData.pdf"]);

  const handleSelectChange = (value) => {
    setSelectedFile(value);
    setUploadedFile(null);
    message.success(`Selected: ${value}`);
  };

  const handleUpload = ({ file }) => {
    setUploadedFile(file.name);
    setSelectedFile(null);
    setStoredFiles((prev) => [...prev, file.name]);
    message.success(`${file.name} uploaded successfully!`);
  };

  const handleGenerate = () => {
    if (!selectedFile && !uploadedFile) {
      message.warning("Please select or upload a file first!");
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setShowPreview(true);
      message.success("Knowledge graph generated successfully!");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-start justify-start bg-white px-12 py-20">
      <div className="w-full max-w-8xl  rounded-2xl p-12 flex flex-col space-y-12">
        <motion.h1
          className="text-6xl font-extrabold text-left text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          📚 Knowledge Graph Generator
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            className="p-16 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            <label className="block text-gray-800 font-semibold mb-4">📌 Select a Stored File:</label>
            <Select placeholder="Choose a file" className="w-full" onChange={handleSelectChange}>
              {storedFiles.map((file) => (
                <Option key={file} value={file}>{file}</Option>
              ))}
            </Select>
          </motion.div>

          <motion.div
            className="p-10 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            <label className="block text-gray-800 font-semibold mb-6">📤 Upload a New File:</label>
            <Upload beforeUpload={(file) => { handleUpload({ file }); return false; }} showUploadList={false}>
              <Button type="primary" className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200">Upload File</Button>
            </Upload>
            {uploadedFile && (
              <motion.div
                className="mt-3 p-3 bg-green-100 rounded-md flex items-start gap-2 text-green-800 border border-green-400"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircleOutlined className="text-green-600" />
                <span><b>{uploadedFile}</b> uploaded successfully!</span>
              </motion.div>
            )}
          </motion.div>
        </div>

        <motion.div
          className="flex justify-start"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        >
          <Button
            type="primary"
            className="w-1/2 bg-blue-700 hover:bg-blue-800 text-lg py-10 rounded-lg shadow-md transition duration-200"
            onClick={handleGenerate}
            loading={processing}
          >
            Generate Knowledge Graph
          </Button>
        </motion.div>

        <motion.div
          className="flex justify-start"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        >
          <Card className="w-full max-w-lg">
            {!showPreview ? (
              <div className="flex flex-col items-start justify-start p-6">
                <img
                  src="https://img.freepik.com/free-vector/file-folder-concept-illustration_114360-206.jpg?t=st=1739633918~exp=1739637518~hmac=c885276b51cfabcb87ae14ac7951cd58a9d354f5c6e02f795a4a9b695b5aac71&w=740"
                  alt="Placeholder"
                  className="rounded-md mb-4"
                />
                <p className="text-gray-600">Generate a graph to see the preview.</p>
              </div>
            ) : (
              <div className="flex flex-col items-start justify-start p-6">
                <h3 className="text-lg font-semibold flex items-start justify-start gap-2 mb-4 text-gray-900">
                  <FileTextOutlined className="text-blue-600" />
                  Knowledge Graph Preview
                </h3>
                <img
                  src="https://via.placeholder.com/500x300?text=Generated+Graph"
                  alt="Generated Graph"
                  className="rounded-lg border border-gray-300 shadow-md"
                />
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default KnowledgeGraph;
