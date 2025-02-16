import React, { useState, useEffect } from "react";
import { Sparkles, Book, Send } from "lucide-react";
import PlaceHolder from "../component/sections/PlaceHolder";
import AiResponse from "../component/sections/AiResponse";
import axios from "axios";

const TalkDataInterface = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [responses, setResponses] = useState([]);
  const BACKEND_CHAT = "https://e96b-2409-40c0-100c-34f2-403a-a081-6994-d507.ngrok-free.app/chat"

  const handleMessageChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleResponse = () => {
    if (!inputMessage.trim()) return; // Prevent empty message
    
    setResponses((prevMessages) => [
      ...prevMessages,
      { text: inputMessage, sender: "user" },
    ]);

    const fetchResponse = async () => {
      const payload = {
        question: inputMessage,
        session_id: "12345",
        model: "llama3-70b-8192"
      }
      const data = await axios.post(BACKEND_CHAT, payload);
      const response = data.data;
      setResponses((prev) => [...prev, { text: response.answer, sender: "ai" }]);
    }

    fetchResponse();
    
    setInputMessage("");
  };

  return (
    <div className="relative max-w-5xl mx-auto text-center text-black h-screen flex flex-col justify-between flex-1">
      {/* Header */}

      {responses.length === 0 && (
        <PlaceHolder setInputMessage={setInputMessage} />
      )}

      {responses.length !== 0 && (
        <AiResponse messages={responses}/>
      )}

      {/* Input Section */}
      <div className="bg-gray-200 rounded-xl p-4 absolute items-center bottom-0 w-full mb-4 flex justify-between mb-8">
        <div className="flex items-start gap-2 w-[85%]">
          <Sparkles className="w-5 h-5 text-gray-600" />
          <input
            placeholder="Ask AI a question or make a request..."
            className="flex-1 bg-transparent resize-none outline-none text-md"
            value={inputMessage}
            onChange={handleMessageChange}
          />
        </div>

        <div className="flex items-center gap-2 ">
          <span className="text-sm text-gray-500">{inputMessage.length}/2000</span>
          <button className="text-gray-400 hover:text-gray-900">
            <Send
              className={`mr-5 w-6 h-6 ${
                inputMessage.length !== 0
                  ? "text-gray-900 cursor-pointer"
                  : "text-gray-500"
              }`}
              style={{ rotate: "45deg" }}
              onClick={inputMessage.length !== 0 ? handleResponse : undefined}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TalkDataInterface;
