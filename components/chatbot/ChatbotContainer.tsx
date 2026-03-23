import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { SuggestionsGrid } from './SuggestionsGrid';
import { useLanguage } from '@/lib/language-context';
import { Language } from '@/lib/translations';
import { getMatchingServices, getTopSuggestions, ServiceInfo } from '@/lib/chatbot-data';
import { X, Bot, Sparkles, SendHorizontal } from 'lucide-react';

interface ChatbotContainerProps {
  onClose: () => void;
}

const botT = {
  en: {
    welcome: "Hi! Welcome to One Touch! ✨",
    welcomeBack: (name: string) => `Welcome back, ${name}! 👋`,
    selectLanguage: "Please select your preferred language:",
    askService: "What service are you looking for today?",
    askName: "What is your name?",
    greetName: (name: string) => `Hi ${name}! What service are you looking for?`,
    foundResults: (count: number) => `I found ${count} matching service${count > 1 ? 's' : ''}. Please select one:`,
    noResults: "I couldn't find any matching services. Please try another search term or broad category (e.g., Cleaning, Repair).",
    redirecting: (name: string) => `Great choice! Redirecting you to ${name}... ✓`,
    placeholderName: "Type your name...",
    placeholderService: "Type a service or use voice...",
  },
  ta: {
    welcome: "வணக்கம்! ஒன் டச்-க்கு வரவேற்கிறோம்! ✨",
    welcomeBack: (name: string) => `மீண்டும் வருக, ${name}! 👋`,
    selectLanguage: "தயவுசெய்து உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்:",
    askService: "இன்று நீங்கள் எந்த சேவையைத் தேடுகிறீர்கள்?",
    askName: "உங்கள் பெயர் என்ன?",
    greetName: (name: string) => `வணக்கம் ${name}! நீங்கள் எந்த சேவையைத் தேடுகிறீர்கள்?`,
    foundResults: (count: number) => `${count} பொருத்தமான சேவைகளைக் கண்டறிந்தேன். ஒன்றைத் தேர்ந்தெடுக்கவும்:`,
    noResults: "பொருத்தமான சேவைகள் எதுவும் கிடைக்கவில்லை. மற்றொரு தேடல் சொல் அல்லது வகையை (எ.கா., சுத்தம் செய்தல், பழுதுபார்த்தல்) முயலவும்.",
    redirecting: (name: string) => `சிறந்த தேர்வு! ${name}-க்கு அழைத்துச் செல்கிறேன்... ✓`,
    placeholderName: "உங்கள் பெயரை உள்ளிடவும்...",
    placeholderService: "சேவையை உள்ளிடவும் அல்லது குரல் மூலம் தேடவும்...",
  }
};

interface Message {
  id: string;
  text: string | React.ReactNode;
  isBot: boolean;
}

type Step = 'GREETING' | 'LANGUAGE' | 'NAME' | 'REQUIREMENT' | 'RESULTS' | 'CONFIRMATION';

export function ChatbotContainer({ onClose }: ChatbotContainerProps) {
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState<Step>('GREETING');
  // Removed local language state to sync with global context
  const [userName, setUserName] = useState<string>('');
  const [suggestions, setSuggestions] = useState<ServiceInfo[]>([]);
  const [query, setQuery] = useState('');

  const currentT = botT[language];

  const addBotMessage = (text: string | React.ReactNode, delay = 0) => {
    if (delay > 0) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { id: Date.now().toString() + Math.random(), text, isBot: true }]);
      }, delay);
    } else {
      setMessages(prev => [...prev, { id: Date.now().toString() + Math.random(), text, isBot: true }]);
    }
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, { id: Date.now().toString() + Math.random(), text, isBot: false }]);
  };

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const storedName = sessionStorage.getItem('chatbot_userName');
    if (storedName) {
      setUserName(storedName);
      setStep('REQUIREMENT');
      addBotMessage(<span className="font-semibold sm:text-sm text-[13px]">{botT.en.welcomeBack(storedName)}</span>, 400);
      setTimeout(() => {
        addBotMessage(botT.en.askService, 600);
      }, 700);
    } else {
      addBotMessage(<span className="font-semibold sm:text-sm text-[13px]">{botT.en.welcome}</span>, 400);
      setTimeout(() => {
        addBotMessage(
          <div className="flex flex-col gap-2">
            <span>{botT.en.selectLanguage}</span>
            <div className="flex gap-2.5 mt-1">
              <button 
                onClick={() => handleLanguageSelect('en')} 
                className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 transition-all rounded-full text-xs font-semibold shadow-sm"
              >
                English
              </button>
              <button 
                onClick={() => handleLanguageSelect('ta')} 
                className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 transition-all rounded-full text-xs font-semibold shadow-sm"
              >
                Tamil
              </button>
            </div>
          </div>,
          800
        );
      }, 900);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, suggestions]);

  const handleLanguageSelect = (lang: Language) => {
    if (step !== 'GREETING') return;
    setLanguage(lang); // Update global app language
    addUserMessage(lang === 'ta' ? 'தமிழ்' : 'English');
    setStep('NAME');
    setTimeout(() => {
      addBotMessage(botT[lang].askName, 400);
    }, 400);
  };

  const handleSend = (text: string) => {
    if (step === 'GREETING') return;

    addUserMessage(text);

    if (step === 'NAME') {
      setUserName(text);
      sessionStorage.setItem('chatbot_userName', text);
      setStep('REQUIREMENT');
      setTimeout(() => {
        addBotMessage(currentT.greetName(text), 500);
      }, 500);
      return;
    }

    if (step === 'REQUIREMENT' || step === 'RESULTS') {
      setStep('RESULTS');
      setQuery(text);
      const results = getMatchingServices(text);
      setSuggestions(results);
      
      if (results.length > 0) {
        addBotMessage(currentT.foundResults(results.length), 800);
      } else {
        addBotMessage(currentT.noResults, 800);
      }
    }
  };

  const handleQuickSuggest = (val: string) => {
    handleSend(val);
  };

  const handleServiceSelect = (service: ServiceInfo) => {
    setSuggestions([]);
    addUserMessage(`Selected: ${service.name}`);
    setStep('CONFIRMATION');
    setTimeout(() => {
      addBotMessage(<span className="text-green-600 font-medium w-full block">Great choice! Redirecting you to {service.name}... ✓</span>);
      setTimeout(() => {
        const query = encodeURIComponent(service.name);
        router.push(`/search?q=${query}`);
        onClose(); 
      }, 1500);
    }, 400);
  };

  const isInputDisabled = step === 'GREETING' || step === 'CONFIRMATION';
  const placeholderText = step === 'NAME' ? "Type your name..." : "Type a service or use voice...";

  return (
    <div className="chatbot-container flex flex-col h-full sm:h-[600px] w-full bg-white sm:rounded-3xl sm:shadow-2xl sm:border sm:border-gray-200/50 overflow-hidden sm:text-sm text-[13px] sm:animate-in sm:zoom-in-95 sm:duration-300">
      {/* Professional AI Header */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 opacity-10">
          <Sparkles className="w-12 h-12" />
        </div>
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
            <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold sm:text-base text-sm tracking-tight leading-tight">
              One Touch AI
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]"></span>
              <span className="text-[11px] text-blue-100 font-medium">Always Active</span>
            </div>
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="p-2 hover:bg-white/10 rounded-xl transition-all sm:hidden" 
          aria-label="Close Chat"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-[#f8fafc] flex flex-col gap-2 pr-2 pb-24 custom-scroll custom-chatbot-scrollbar" ref={scrollRef}>
        <style>{`
          .custom-chatbot-scrollbar::-webkit-scrollbar { width: 5px; }
          .custom-chatbot-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 5px; }
        `}</style>
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg.text} isBot={msg.isBot} />
        ))}
        {isTyping && (
          <div className="flex justify-start mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white border border-gray-200/60 rounded-[20px] rounded-bl-none px-3 py-2.5 sm:px-4 sm:py-3 flex gap-1 items-center shadow-sm">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}
        {step === 'REQUIREMENT' && !isTyping && messages.length > 0 && messages[messages.length-1].isBot && (
          <div className="flex flex-wrap gap-2 mb-4 animate-in fade-in slide-in-from-top-2 duration-500">
            {getTopSuggestions().map(item => (
              <button
                key={item}
                onClick={() => handleQuickSuggest(item)}
                className="px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 text-[11px] font-semibold hover:bg-blue-100 transition-all hover:scale-105 active:scale-95 shadow-sm"
              >
                {t(item)}
              </button>
            ))}
          </div>
        )}
        {suggestions.length > 0 && !isTyping && (
          <div className="animate-[fadeIn_0.3s_ease-out_forwards]">
            <SuggestionsGrid suggestions={suggestions} onSelect={handleServiceSelect} query={query} />
          </div>
        )}
      </div>

      <ChatInput onSend={handleSend} disabled={isInputDisabled} placeholder={placeholderText} language={language} />
    </div>
  );
}
