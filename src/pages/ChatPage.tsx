import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const ChatPage = () => {
  const [bgClass, setBgClass] = useState("bg-slate-50");
  const [showRiskAlert, setShowRiskAlert] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi there. I'm here to listen. How are you feeling right now?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { 
    id: Date.now().toString(),
    role: 'user',
    content: input.trim()
  }; // <--- MAKE SURE YOU ARE OUTSIDE THIS BRACKET

  // --- NEW SAFETY NET CHECK ---
  const lowerInput = input.toLowerCase();
  if (lowerInput.includes("suicid") || lowerInput.includes("kill") || lowerInput.includes("I love her") || lowerInput.includes("die")) {
    setShowRiskAlert(true);
  }
  // -----------------------------

  setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch('http://127.0.0.1:8001/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: userMessage.content }),
      });

      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.analysis
      };
      setMessages(prev => [...prev, aiMessage]);
      
      // RISK ALERT LOGIC
      if (data.alert === true) {
        setShowRiskAlert(true);
      } else {
        setShowRiskAlert(false);
      }

      // MOOD COLOR LOGIC
      switch (data.mood) {
        case 'happy': setBgClass("bg-gradient-to-br from-yellow-50 to-orange-100"); break;
        case 'sad': setBgClass("bg-gradient-to-br from-gray-100 to-slate-200"); break;
        case 'stressed': setBgClass("bg-gradient-to-br from-red-50 to-rose-100"); break;
        case 'calm': setBgClass("bg-gradient-to-br from-blue-50 to-cyan-100"); break;
        default: setBgClass("bg-slate-50");
      }

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
  <div className={`flex flex-col h-screen transition-colors duration-1000 ease-in-out ${bgClass}`}>
    {/* Header */}
    <div className="p-4 bg-white border-b shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
          E
        </div>
        <div>
          <h1 className="font-bold text-slate-800">EchoCare AI</h1>
          <p className="text-xs text-green-500 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Online
          </p>
        </div>
      </div>
    </div>

    {/* Chat Area */}
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {messages.map((m, index) => (
        <div
          key={index}
          className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`flex gap-3 max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium
              ${m.role === 'user' ? 'bg-slate-300' : 'bg-purple-100 text-purple-700'}`}>
              {m.role === 'user' ? 'You' : 'AI'}
            </div>

            {/* Bubble */}
            <div
              className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed
                ${m.role === 'user' 
                  ? 'bg-purple-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'}`}
            >
              {m.content}
            </div>
          </div>
        </div>
      ))}
      {isTyping && (
        <div className="flex justify-start">
          <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        </div>
      )}
    </div>

    {/* Input Area */}
    <div className="p-4 bg-white border-t">
      <div className="max-w-4xl mx-auto flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your feelings here..."
          className="flex-1 p-3 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm transition-all"
        />
        <button
          onClick={handleSend}
          className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-xl transition-colors shadow-md active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </div>
    </div>
    {/* RISK ALERT POPUP */}
{showRiskAlert && (
  <div className="fixed bottom-24 right-4 max-w-sm bg-red-50 border border-red-200 p-5 rounded-2xl shadow-2xl z-50 animate-bounce">
    <div className="flex items-start gap-4">
      <div className="bg-red-500 text-white p-2 rounded-full">
        ⚠️
      </div>
      <div>
        <h3 className="font-bold text-red-800 text-lg">High Stress Detected</h3>
        <p className="text-sm text-red-700 mt-1 mb-4">
          I've noticed you're going through a very difficult time. It might help to talk to a professional.
        </p>
        <button 
  onClick={() => {
    // 1. Show instant popup
    alert("Alert sent! Dr. Sharma has been notified.");
    
    // 2. Send email signal to backend
    fetch('http://127.0.0.1:8001/send-alert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_email: "student_rohit@cgc.edu" })
    });
  }}
  className="w-full bg-white text-red-600 hover:bg-slate-100 font-bold py-3 px-4 rounded-lg transition-colors shadow-lg flex items-center justify-center gap-2 mt-3"
>
  Connect to Dr. Sharma
</button>
      </div>
    </div>
  </div>
)}
  </div>
);
};

export default ChatPage;