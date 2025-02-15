import React from "react";

const AiResponse = ({ messages }) => {

  return (
    <div className='h-3/4 mt-12 overflow-y-scroll scrollbar-hidden w-full text'> 
      {messages.map((message, index) =>
        message.sender === "user" ? (
          <div key={index} className="flex justify-end justify-start my-4">
            <div className="max-w-xl px-4 py-2 rounded-md bg-purple-500 text-white md:text-lg text-sm text-right w-auto" style={{lineBreak: "anywhere"}}>
              {message.text}
            </div>
          </div>
        ) : (
          <div key={index} className="ai-response flex text-black text-left">
            <div className="w-9 h-9 md:mr-3 mr-2 border bg-purple-500 border-gray-600 p-2 rounded-full">
              <img src="/devflow_logo.png" alt="Devflow Logo" />
            </div>
            <div className="flex-1 text-black text-lg" >{message.text}</div>
          </div>
        )
      )}
    </div>
  );
};

export default AiResponse;
