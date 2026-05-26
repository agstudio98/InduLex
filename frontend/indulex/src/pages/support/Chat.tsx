import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, Tag, HelpCircle } from 'lucide-react';

const CATEGORIES = ['ORDERS', 'PAYMENTS', 'PRODUCTS', 'SHIPPING', 'OTHER'] as const;
type Category = typeof CATEGORIES[number];

/**
 * Chat Support Component
 * 
 * An interactive, tag-based virtual assistant.
 * It provides instant answers to common questions about:
 * - Order Management
 * - Payment Methods
 * - Garment Care
 * - Shipping & Delivery
 * It simulates a conversational interface with typing indicators and localized dialogues.
 * 
 * @returns {JSX.Element} The rendered support chat interface
 */
export const Chat = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [messages, setMessages] = useState([
    { role: 'bot', text: t('SUPPORT.BOT_WELCOME') }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSelectCategory = (category: Category) => {
    if (loading || category === selectedCategory) return;
    
    setSelectedCategory(category);
    
    // Create dialogue flow
    const userMsg = { role: 'user' as const, text: t(`SUPPORT.CATEGORIES.${category}`) };
    const botResponse = { role: 'bot' as const, text: t(`SUPPORT.DIALOGUES.${category}`) };
    
    // Add user message immediately
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    // Simulate "typing" for a more natural feel
    setTimeout(() => {
      setMessages(prev => [...prev, botResponse]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="h-[650px] flex flex-col rounded-[2.5rem] glass dark:glass overflow-hidden shadow-2xl border-white/10 animate-fade-in-up">
      {/* Header */}
      <div className="p-6 glass bg-blue-600/10 border-none flex items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
            <MessageSquare className="text-blue-500" size={24} />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-[#0a0a0a] rounded-full"></div>
        </div>
        <div>
          <h4 className="font-black font-figtree tracking-tight">{t('SUPPORT.AGENT_VIRTUAL')}</h4>
          <p className="text-[10px] font-black uppercase tracking-widest text-green-500">{t('SUPPORT.ONLINE')}</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-grow p-8 overflow-y-auto space-y-6 bg-white/5 custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`max-w-[85%] p-5 rounded-3xl font-medium shadow-sm leading-relaxed ${
              m.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none shadow-blue-500/20' 
                : 'glass bg-white/10 dark:bg-black/5 text-white rounded-tl-none border-white/5'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="glass bg-white/10 p-4 rounded-3xl rounded-tl-none animate-pulse">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Topic Selection */}
      <div className="p-8 glass border-none space-y-6">
        <div className="flex items-center gap-3">
          <HelpCircle size={18} className="text-blue-500" />
          <span className="text-xs font-black uppercase tracking-widest opacity-60">¿En qué puedo ayudarte?</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleSelectCategory(cat)}
              disabled={loading}
              className={`flex items-center justify-between p-4 rounded-2xl transition-all border group ${
                selectedCategory === cat 
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20' 
                  : 'glass border-white/10 hover:bg-white/10 opacity-70 hover:opacity-100 hover:scale-[1.02]'
              } ${loading ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <span className="text-xs font-bold">{t(`SUPPORT.CATEGORIES.${cat}`)}</span>
              <Tag size={14} className={selectedCategory === cat ? 'text-white' : 'text-blue-500 opacity-40 group-hover:opacity-100'} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
