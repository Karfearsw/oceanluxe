import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, User, Minimize2 } from 'lucide-react';
import { createConciergeChat } from '../services/gemini';
import { Message } from '../types';

const Concierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Welcome to Ocean Luxe Estates. I am Oretha, your personal real estate concierge. How may I assist you with your property journey today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Chat session ref to persist across renders
  const chatSession = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatSession.current) {
      chatSession.current = createConciergeChat();
    }
    
    // Load memory from local storage if available
    const saved = localStorage.getItem('oretha_memory');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
                // We restart with history if needed, but for now let's just prepend 
                // In a real app we'd hydrate the chat history with the model
            }
        } catch(e) {}
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // Save to "Memory"
    if (messages.length > 1) {
        localStorage.setItem('oretha_memory', JSON.stringify(messages));
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const result = await chatSession.current.sendMessage({ message: userMsg.text });
      const responseText = result.text; // Access text property directly

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat error", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "I apologize, I'm having trouble connecting to the Stackk Cloud servers. Please try again momentarily.",
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center border-2 border-brand-gold ${isOpen ? 'bg-brand-gold rotate-90' : 'bg-black text-white'}`}
        aria-label="Open Concierge"
      >
        {isOpen ? <X className="w-6 h-6 text-black" /> : <Sparkles className="w-6 h-6 text-brand-gold" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-sm md:w-96 bg-black/95 border border-brand-gold/30 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 h-[500px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-gold to-black p-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border border-white/20">
                <Bot className="w-6 h-6 text-brand-gold" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-white">Oretha AI</h3>
                <p className="text-xs text-gray-300 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Online Concierge
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
              <Minimize2 className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                    msg.role === 'user'
                      ? 'bg-brand-gold text-black font-medium rounded-br-none'
                      : 'bg-white/10 text-gray-200 rounded-bl-none border border-white/5'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 rounded-2xl p-4 rounded-bl-none flex gap-1">
                  <span className="w-2 h-2 bg-brand-gold/50 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-brand-gold/50 rounded-full animate-bounce delay-75"></span>
                  <span className="w-2 h-2 bg-brand-gold/50 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-black border-t border-white/10">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about properties..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="absolute right-2 p-2 bg-brand-gold rounded-full text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-600 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-2 text-center">
              <p className="text-[10px] text-gray-600 uppercase tracking-widest">Powered by Stackk Cloud</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Concierge;