import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Sparkles, Minimize2 } from 'lucide-react';
import { Message } from '../types';

type FaqIntent = {
  id: string;
  label: string;
  category: 'Buy / Sell / Invest' | 'Pricing / Process' | 'Off-Market / Financing';
  keywords: string[];
  reply: string;
};

const FAQ_INTENTS: FaqIntent[] = [
  {
    id: 'buy-markets',
    label: 'Where can I buy luxury properties?',
    category: 'Buy / Sell / Invest',
    keywords: ['buy', 'purchase', 'market', 'rhode island', 'massachusetts', 'florida', 'michigan', 'properties'],
    reply: 'Ocean Luxe serves Rhode Island, Massachusetts, Florida, and Michigan. We can help you buy luxury residential, commercial, and investment-grade properties in these markets.'
  },
  {
    id: 'invest',
    label: 'Can you help with investment properties?',
    category: 'Buy / Sell / Invest',
    keywords: ['invest', 'investment', 'roi', 'returns', 'cash flow', 'deal'],
    reply: 'Yes. We guide investment-focused clients on multi-family, mixed-use, and select commercial opportunities with underwriting-oriented support and clear execution strategy.'
  },
  {
    id: 'sell',
    label: 'How do I list and sell with Ocean Luxe?',
    category: 'Buy / Sell / Invest',
    keywords: ['sell', 'listing', 'list', 'market my home', 'valuation'],
    reply: 'Our sell-side process includes pricing strategy, premium presentation, targeted outreach, negotiation, and full transaction support from listing to close.'
  },
  {
    id: 'consult',
    label: 'How do I start with an advisor?',
    category: 'Buy / Sell / Invest',
    keywords: ['advisor', 'consultation', 'start', 'talk', 'speak'],
    reply: 'You can start with a quick consultation call. Share your timeline, budget, and preferred market, and we will map your next steps immediately.'
  },
  {
    id: 'fees',
    label: 'How does pricing/commission work?',
    category: 'Pricing / Process',
    keywords: ['commission', 'fee', 'fees', 'cost', 'pricing'],
    reply: 'Commission and fees depend on transaction type and scope. We provide clear terms upfront during consultation so expectations are aligned before engagement.'
  },
  {
    id: 'timeline',
    label: 'What timeline should I expect?',
    category: 'Pricing / Process',
    keywords: ['timeline', 'how long', 'close', 'closing', 'process time'],
    reply: 'Timelines vary by property type, financing, and due diligence. Most deals follow discovery, underwriting, negotiation, contract, and closing milestones.'
  },
  {
    id: 'process',
    label: 'What is your process step-by-step?',
    category: 'Pricing / Process',
    keywords: ['process', 'steps', 'how it works', 'workflow'],
    reply: 'Our process is: Discover opportunities, Analyze fit and risk, then Close with negotiation and transaction coordination. We keep communication clear at every stage.'
  },
  {
    id: 'preapproval',
    label: 'Do I need financing pre-approval first?',
    category: 'Pricing / Process',
    keywords: ['financing', 'pre-approval', 'preapproval', 'loan', 'mortgage'],
    reply: 'Pre-approval is strongly recommended before active touring or offer strategy. It improves speed, credibility, and negotiation strength.'
  },
  {
    id: 'offmarket',
    label: 'Do you have off-market opportunities?',
    category: 'Off-Market / Financing',
    keywords: ['off market', 'off-market', 'exclusive', 'private listing', 'inventory'],
    reply: 'Yes, we can provide access to select off-market opportunities based on your criteria and readiness. Share target market, asset type, and budget to qualify.'
  },
  {
    id: 'lead-gen',
    label: 'Can you help find property owner leads?',
    category: 'Off-Market / Financing',
    keywords: ['owner', 'lead', 'skip tracing', 'lookup', 'property owner'],
    reply: 'We can guide owner outreach strategy and market-based sourcing options, then route qualified opportunities into your acquisition pipeline.'
  },
  {
    id: 'financing-ready',
    label: 'How do I know if I am financing-ready?',
    category: 'Off-Market / Financing',
    keywords: ['ready', 'financing-ready', 'debt', 'lender', 'loan terms'],
    reply: 'Financing readiness usually means verified income/capital, target loan range, and a clear acquisition criteria set. We can help you prepare before active negotiations.'
  },
  {
    id: 'contact',
    label: 'How can I contact your team now?',
    category: 'Off-Market / Financing',
    keywords: ['contact', 'phone', 'email', 'call', 'reach'],
    reply: 'You can reach Ocean Luxe directly at +1 (800) LUXE-EST or use the Contact form on this page for a fast follow-up from our team.'
  }
];

const QUICK_QUESTION_IDS = [
  'buy-markets',
  'invest',
  'sell',
  'fees',
  'timeline',
  'offmarket',
  'preapproval',
  'contact'
];

const normalizeQuestion = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const findBestIntent = (question: string): FaqIntent | null => {
  const normalized = normalizeQuestion(question);
  if (!normalized) return null;

  let best: { intent: FaqIntent; score: number } | null = null;

  for (const intent of FAQ_INTENTS) {
    let score = 0;
    for (const keyword of intent.keywords) {
      if (normalized.includes(keyword)) {
        score += keyword.includes(' ') ? 2 : 1;
      }
    }

    if (score > 0 && (!best || score > best.score)) {
      best = { intent, score };
    }
  }

  return best ? best.intent : null;
};

const buildFallbackReply = () =>
  'I can help with buying, selling, investing, off-market opportunities, financing readiness, and timelines. Tap a quick question below or contact us directly at +1 (800) LUXE-EST.';

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

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('oretha_memory');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const restored = parsed.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          })) as Message[];
          setMessages(restored);
        }
      } catch (e) {
        console.warn('Failed to parse Oretha memory', e);
      }
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // Save to "Memory"
    if (messages.length > 1) {
        localStorage.setItem('oretha_memory', JSON.stringify(messages));
    }
  }, [messages]);

  const appendBotReply = (text: string) => {
    setIsTyping(true);
    window.setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleQuestion = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: trimmed,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    const match = findBestIntent(trimmed);
    appendBotReply(match ? match.reply : buildFallbackReply());
  };

  const handleSend = () => {
    handleQuestion(input);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-24 right-4 md:bottom-6 md:right-6 z-50 p-3 md:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center border-2 border-brand-gold ${isOpen ? 'bg-brand-gold rotate-90' : 'bg-black text-white'}`}
        aria-label="Open Concierge"
      >
        {isOpen ? <X className="w-5 h-5 md:w-6 md:h-6 text-black" /> : <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-brand-gold" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-40 right-4 md:bottom-24 md:right-6 z-50 w-[92vw] max-w-[360px] md:w-[360px] bg-black/95 border border-brand-gold/30 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 h-[70vh] max-h-[520px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-gold to-black p-3.5 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center border border-white/20">
                <Bot className="w-5 h-5 text-brand-gold" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-white">Oretha AI</h3>
                <p className="text-[11px] text-gray-200 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
                  Auto Concierge
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
              <Minimize2 className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-black/50">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500">Popular questions</p>
              <div className="flex flex-wrap gap-2">
                {QUICK_QUESTION_IDS.map((id) => {
                  const intent = FAQ_INTENTS.find(i => i.id === id);
                  if (!intent) return null;
                  return (
                    <button
                      key={id}
                      onClick={() => handleQuestion(intent.label)}
                      className="text-[11px] border border-white/15 rounded-full px-2.5 py-1 text-gray-200 hover:border-brand-gold/60 hover:text-white transition-colors"
                    >
                      {intent.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-2.5 text-sm leading-relaxed ${
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
          <div className="p-3 bg-black border-t border-white/10">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about properties..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all text-sm"
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
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Powered by Stackk Cloud</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Concierge;
