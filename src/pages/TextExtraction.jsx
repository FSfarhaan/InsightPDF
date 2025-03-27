import React, { useState, useEffect } from 'react';
import { FileUp, FileText, Trash2, FileStack, AlignLeft, BookmarkIcon, HeadingIcon } from 'lucide-react';
import * as mammoth from 'mammoth';

const TextExtraction = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [documentStructure, setDocumentStructure] = useState({
    header: '',
    mainContent: '',
    conclusion: '',
    references: ''
  });
  const [activeSection, setActiveSection] = useState('mainContent');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const extractDocumentSections = (text) => {
    // Normalize text and split into lines
    const lines = text.split('\n')
      .map(line => line.trim())
      .filter(line => line !== '');

    // Default structure
    const sections = {
      header: '',
      mainContent: '',
      conclusion: '',
      references: ''
    };

    // Try to detect different sections
    const headerKeywords = ['title', 'header', 'abstract'];
    const conclusionKeywords = ['conclusion', 'summary', 'final thoughts'];
    const referencesKeywords = ['references', 'bibliography', 'works cited'];

    // Find header (first few lines)
    sections.header = lines.slice(0, 3).join('\n');

    // Find conclusion and references
    const conclusionStart = lines.findIndex(line => 
      conclusionKeywords.some(keyword => 
        line.toLowerCase().includes(keyword)
      )
    );

    const referencesStart = lines.findIndex(line => 
      referencesKeywords.some(keyword => 
        line.toLowerCase().includes(keyword)
      )
    );

    // Extract main content (everything between header and conclusion/references)
    const mainContentStart = sections.header ? 3 : 0;
    const mainContentEnd = conclusionStart !== -1 ? conclusionStart : 
                           referencesStart !== -1 ? referencesStart : 
                           lines.length;
    
    sections.mainContent = lines.slice(mainContentStart, mainContentEnd).join('\n');

    // Extract conclusion if found
    if (conclusionStart !== -1) {
      const conclusionEnd = referencesStart !== -1 ? referencesStart : lines.length;
      sections.conclusion = lines.slice(conclusionStart, conclusionEnd).join('\n');
    }

    // Extract references if found
    if (referencesStart !== -1) {
      sections.references = lines.slice(referencesStart).join('\n');
    }

    // Fallback if sections are empty
    if (!sections.mainContent) {
      sections.mainContent = lines.join('\n');
    }

    return sections;
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);
    setUploadedFile(file);

    try {
      let text = '';
      
      if (
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
        file.type === 'application/msword'
      ) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        text = result.value;
      } else if (file.type === 'text/plain') {
        text = await file.text();
      } else {
        throw new Error('Unsupported file type');
      }

      // Ensure text is not empty
      if (!text.trim()) {
        throw new Error('No text could be extracted from the document');
      }

      // Extract document sections
      const sections = extractDocumentSections(text);
      setDocumentStructure(sections);
      
      // Set main content as default active section
      setActiveSection('mainContent');
    } catch (err) {
      setError(err.message);
      setUploadedFile(null);
      setDocumentStructure({
        header: '',
        mainContent: '',
        conclusion: '',
        references: ''
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setDocumentStructure({
      header: '',
      mainContent: '',
      conclusion: '',
      references: ''
    });
    setActiveSection('mainContent');
    setError(null);
  };

  // Section tabs configuration
  const sectionTabs = [
    { 
      key: 'header', 
      label: 'Header', 
      icon: <HeadingIcon className="w-5 h-5 mr-2" /> 
    },
    { 
      key: 'mainContent', 
      label: 'Main Content', 
      icon: <FileStack className="w-5 h-5 mr-2" /> 
    },
    { 
      key: 'conclusion', 
      label: 'Conclusion', 
      icon: <BookmarkIcon className="w-5 h-5 mr-2" /> 
    },
    { 
      key: 'references', 
      label: 'References', 
      icon: <FileText className="w-5 h-5 mr-2" /> 
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
        {/* File Upload Section */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Upload Document</h2>
          <div className="border-2 border-dashed border-gray-300 p-4 text-center">
            <input 
              type="file" 
              accept=".docx,.doc,.txt"
              onChange={handleFileUpload}
              className="hidden" 
              id="file-upload"
            />
            <label 
              htmlFor="file-upload" 
              className="cursor-pointer flex flex-col items-center"
            >
              <FileUp className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-600">
                Upload Document
                <br />
                <span className="text-sm text-gray-500">
                  (DOCX, DOC, TXT)
                </span>
              </p>
            </label>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="space-y-2">
          {sectionTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveSection(tab.key)}
              className={`
                w-full text-left p-2 rounded flex items-center
                ${activeSection === tab.key 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'hover:bg-gray-100'}
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Remove File Button */}
        {uploadedFile && (
          <button 
            onClick={handleRemoveFile}
            className="mt-4 w-full bg-red-500 text-white py-2 rounded flex items-center justify-center"
          >
            <Trash2 className="mr-2 w-4 h-4" />
            Remove Document
          </button>
        )}
      </div>

      {/* Document Content Area */}
      <div className="flex-1 p-6 overflow-auto">
        {isLoading ? (
          <div className="text-center text-gray-600">Processing document...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">
              {sectionTabs.find(tab => tab.key === activeSection)?.label || 'Document Content'}
            </h2>
            <div className="prose max-w-full">
              <pre className="whitespace-pre-wrap text-gray-800 min-h-[400px]">
                {documentStructure[activeSection] || 'No content found for this section.'}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextExtraction;