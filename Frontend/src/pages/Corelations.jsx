import React, { useState, useRef, useEffect } from 'react';
import { FileText, Upload, Search, AlertTriangle, Download, X, Printer } from 'lucide-react';

const Correlations = () => {
  const [files, setFiles] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const reportRef = useRef(null);

  const [analysisLocal, setAnalysisLocal] = useState("");

  useEffect(() => {
    const analysis = localStorage.getItem("analysis");
    setAnalysis(analysis);
  }, [])

  // Simulated analysis results
  const sampleAnalysis = {
    similarities: [
      { text1: "The project deadline is next week.", text2: "We need to complete this by next week.", score: 0.85 },
      { text1: "Team morale is low.", text2: "Employee satisfaction has decreased.", score: 0.72 },
      { text1: "Resources are limited.", text2: "We have constraints on available resources.", score: 0.68 }
    ],
    contradictions: [
      { text1: "The budget is sufficient.", text2: "We don't have enough resources.", probability: 0.9 },
      { text1: "The timeline is feasible.", text2: "It's impossible to meet the deadline.", probability: 0.95 },
      { text1: "Quality is our priority.", text2: "We need to rush the delivery.", probability: 0.88 }
    ]
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setError('');
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const textFiles = droppedFiles.filter(file => 
      file.type === 'text/plain' || 
      file.name.endsWith('.pdf') || 
      file.name.endsWith('.docx')
    );
    
    if (textFiles.length === 0) {
      setError('Please upload valid text, PDF, or DOCX files');
      return;
    }
    
    setFiles(prev => [...prev, ...textFiles]);
  };

  const handleFileUpload = (e) => {
    setError('');
    const uploadedFiles = Array.from(e.target.files);
    const validFiles = uploadedFiles.filter(file => 
      file.type === 'text/plain' || 
      file.name.endsWith('.pdf') || 
      file.name.endsWith('.docx')
    );

    if (validFiles.length === 0) {
      setError('Please upload valid text, PDF, or DOCX files');
      return;
    }

    setFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleAnalyze = () => {
    if (files.length === 0) {
      setError('Please upload at least one file to analyze');
      return;
    }
    setAnalysis(sampleAnalysis);
    setError('');
  };

  const generateReport = () => {
    if (!analysis) return;
    window.print();
  };

  // Function to render similarity score as a visual indicator
  const renderScoreBar = (score) => {
    const percentage = Math.round(score * 100);
    let colorClass = '';
    
    if (score > 0.8) colorClass = 'bg-green-500';
    else if (score > 0.6) colorClass = 'bg-blue-500';
    else colorClass = 'bg-yellow-500';
    
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
        <div 
          className={`h-2.5 rounded-full ${colorClass}`} 
          style={{ width: `${percentage}%` }}
        ></div>
        <div className="text-xs text-gray-500 mt-1">{percentage}% match</div>
      </div>
    );
  };

  // Function to render contradiction probability as a visual indicator
  const renderProbabilityBar = (probability) => {
    const percentage = Math.round(probability * 100);
    let colorClass = 'bg-red-500';
    
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
        <div 
          className={`h-2.5 rounded-full ${colorClass}`} 
          style={{ width: `${percentage}%` }}
        ></div>
        <div className="text-xs text-gray-500 mt-1">{percentage}% contradiction</div>
      </div>
    );
  };

  return (
    <>
      <div className="p-6 space-y-6 text-black bg-slate-50 min-h-screen print:bg-white print:p-0">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 print:text-center">Document Correlation Analysis</h1>
          
          {/* Upload Section - Hide in print */}
          <div className="print:hidden">
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 mb-8">
              <div className="p-5 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-gray-200">
                <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                  <FileText className="h-6 w-6 text-blue-600" />
                  Upload Documents
                </div>
              </div>
              
              <div className="p-6">
                <div
                  className={`border-3 border-dashed rounded-xl p-10 text-center transition-all duration-200 ${
                    isDragging ? 'border-blue-500 bg-blue-50 scale-102' : 'border-gray-300 hover:border-blue-400'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className="mx-auto h-16 w-16 text-blue-500 mb-4" />
                  <p className="text-base text-gray-600">
                    Drag and drop your files here, or
                    <label className="mx-2 text-blue-500 hover:text-blue-600 cursor-pointer font-medium">
                      browse
                      <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileUpload}
                        accept=".txt,.docx,.pdf"
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Supports TXT, DOCX, PDF files
                  </p>
                </div>

                {error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    {error}
                  </div>
                )}

                {/* File List */}
                {files.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-base font-medium text-gray-700 mb-4">Uploaded Files</h3>
                    <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <FileText className="h-5 w-5 text-blue-500" />
                            {file.name}
                          </div>
                          <button 
                            onClick={() => removeFile(index)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={handleAnalyze}
                      className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-800 transition-all duration-200 font-medium shadow-lg shadow-blue-200"
                    >
                      <Search className="h-5 w-5" />
                      Analyze Documents
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Analysis Results */}
          {analysis && (
            <div className="space-y-6">
              {/* Analyzed Files - Show in print */}
              <div className="hidden print:block mb-8">
                <h2 className="text-xl font-semibold mb-4">Analyzed Files</h2>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="text-gray-600">
                      • {file.name}
                    </div>
                  ))}
                </div>
              </div>
            
              {/* Main Analysis Content */}
              <div className="print:shadow-none print:border-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Similarities Column */}
                  <div className="bg-white rounded-xl overflow-hidden border border-gray-200 print:border-0">
                    <div className="p-5 bg-gradient-to-r from-green-50 to-green-100 border-b border-gray-200 print:bg-none">
                      <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        Similarities
                      </div>
                    </div>
                    <div className="p-6">
                      {sampleAnalysis.similarities.map((item, index) => (
                        <div key={index} className="mb-6 pb-6 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                          <div className="grid grid-cols-1 gap-4">
                            <div className="bg-green-50 p-3 rounded-lg">
                              <div className="text-sm text-gray-600">Document 1:</div>
                              <div className="text-gray-800 mt-1">{item.text1}</div>
                            </div>
                            <div className="bg-green-50 p-3 rounded-lg">
                              <div className="text-sm text-gray-600">Document 2:</div>
                              <div className="text-gray-800 mt-1">{item.text2}</div>
                            </div>
                          </div>
                          <div className="mt-4">
                            {renderScoreBar(item.score)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contradictions Column */}
                  <div className="bg-white rounded-xl overflow-hidden border border-gray-200 print:border-0">
                    <div className="p-5 bg-gradient-to-r from-red-50 to-red-100 border-b border-gray-200 print:bg-none">
                      <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        Contradictions
                      </div>
                    </div>
                    <div className="p-6">
                      {sampleAnalysis.contradictions.map((item, index) => (
                        <div key={index} className="mb-6 pb-6 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                          <div className="grid grid-cols-1 gap-4">
                            <div className="bg-red-50 p-3 rounded-lg">
                              <div className="text-sm text-gray-600">Document 1:</div>
                              <div className="text-gray-800 mt-1">{item.text1}</div>
                            </div>
                            <div className="bg-red-50 p-3 rounded-lg">
                              <div className="text-sm text-gray-600">Document 2:</div>
                              <div className="text-gray-800 mt-1">{item.text2}</div>
                            </div>
                          </div>
                          <div className="mt-4">
                            {renderProbabilityBar(item.probability)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            
              {/* Timestamp - Show in print */}
              <div className="hidden print:block mt-8 pt-4 border-t text-gray-500 text-sm">
                Report generated on: {new Date().toLocaleString()}
              </div>
            
              {/* Download Report Button - Hide in print */}
              <div className="flex justify-start mt-8 print:hidden">
                <button 
                  onClick={generateReport}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                >
                  <Printer className="h-5 w-5" />
                  Print Report
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Correlations;