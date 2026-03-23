"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { SuggestionsGrid } from './SuggestionsGrid';
import { AvatarSpeaker } from './AvatarSpeaker';
import { useLanguage } from '@/lib/language-context';
import { Language } from '@/lib/translations';
import { getMatchingServices, getTopSuggestions, ServiceInfo } from '@/lib/chatbot-data';
import { useSpeech } from '@/hooks/useSpeech';
import { X, Sparkles } from 'lucide-react';

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
    noResults: "I couldn't find any matching services. Please try another search term or broad category.",
    redirecting: (name: string) => `Great choice! Redirecting you to ${name}...`,
    placeholderName: "Type your name...",
    placeholderService: "Type a service or use voice...",
  },
  ta: {
    welcome: "வணக்கம்! ஒன் டச்-க்கு வரவேற்கிறோம்! ✨",
    welcomeBack: (name: string) => `மீண்டும் வருக, ${name}! 👋`,
    selectLanguage: "தயவுசெய்து உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்:",
    askService: "இன்று நீங்கள் எந்த சேவையைத் தேடுகிறீர்கள்?",
    askName: "உங்கள் பெயர் என்ன?",
    // Hidden fallback: "ungal peyar enna" so an English voice can read it if Tamil TTS is utterly missing
    askNameSpeech: "ungal peyar enna?",
    greetName: (name: string) => `வணக்கம் ${name}! நீங்கள் எந்த சேவையைத் தேடுகிறீர்கள்?`,
    greetNameSpeech: (name: string) => `Vanakkam ${name}! Neengal endha sevaiyai thedugireergal?`,
    foundResults: (count: number) => `${count} பொருத்தமான சேவைகளைக் கண்டறிந்தேன். ஒன்றைத் தேர்ந்தெடுக்கவும்:`,
    foundResultsSpeech: (count: number) => `${count} poruthamaana sevaigalai kandarinden. Ondrai therndhedukkavum.`,
    noResults: "பொருத்தமான சேவைகள் எதுவும் கிடைக்கவில்லை. மற்றொரு தேடல் சொல்லை முயலவும்.",
    noResultsSpeech: "Poruthamaana sevaigal yedhuvum kidaikavillai. Mattroru thedal sollai muyalavum.",
    redirecting: (name: string) => `சிறந்த தேர்வு! ${name}-க்கு அழைத்துச் செல்கிறேன்...`,
    redirectingSpeech: (name: string) => `Sirandha thaervu! ${name} ikku azhaiththu chelgiraen...`,
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
  // Audio TTS Hook
  const { speak, stop, isSpeaking } = useSpeech();

  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState<Step>('GREETING');
  const [userName, setUserName] = useState<string>('');
  const [suggestions, setSuggestions] = useState<ServiceInfo[]>([]);
  const [query, setQuery] = useState('');

  const currentT = botT[language];

  /** Add a bot message and optionally speak it */
  const addBotMessage = useCallback((text: string | React.ReactNode, delay = 0, speakText?: string, overrideLang?: string) => {
    const doAdd = () => {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now().toString() + Math.random(), text, isBot: true }]);
      if (speakText || typeof text === 'string') {
        speak(speakText ?? (typeof text === 'string' ? text : ''), overrideLang || language);
      }
    };

    if (delay > 0) {
      setIsTyping(true);
      setTimeout(doAdd, delay);
    } else {
      doAdd();
    }
  }, [language, speak]);

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, { id: Date.now().toString() + Math.random(), text, isBot: false }]);
  };

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Always start from first step (Language selection)
    addBotMessage(
      <span className="font-semibold sm:text-sm text-[13px]">{botT.en.welcome}</span>,
      400,
      'Welcome to One Touch!',
      'en'
    );
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
        800,
        'Please select your preferred language.',
        'en'
      );
      
      // Bilingual Tamil prompt after English finishes
      setTimeout(() => {
        addBotMessage('உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்.', 0, 'Ungal mozhiyai therndhedukkavum.', 'en');
      }, 3500); 
    }, 900);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, suggestions]);

  const handleLanguageSelect = (lang: Language) => {
    if (step !== 'GREETING') return;
    setLanguage(lang);
    addUserMessage(lang === 'ta' ? 'தமிழ்' : 'English');
    setStep('NAME');
    setTimeout(() => {
      stop();
      // Pass the explicit Speech string if it exists for the language, fallback to text
      const speechText = (botT[lang] as any).askNameSpeech || botT[lang].askName;
      addBotMessage(botT[lang].askName, 400, speechText, lang);
    }, 400);
  };

  const handleSend = (text: string) => {
    if (step === 'GREETING' || step === 'LANGUAGE') return;

    addUserMessage(text);

    if (step === 'NAME') {
      setUserName(text);
      sessionStorage.setItem('chatbot_userName', text);
      setStep('REQUIREMENT');
      setTimeout(() => {
        const speechText = (currentT as any).greetNameSpeech ? (currentT as any).greetNameSpeech(text) : currentT.greetName(text);
        addBotMessage(currentT.greetName(text), 500, speechText);
      }, 500);
      return;
    }

    if (step === 'REQUIREMENT' || step === 'RESULTS') {
      setStep('RESULTS');
      setQuery(text);
      const results = getMatchingServices(text);
      setSuggestions(results);

      if (results.length > 0) {
        const speechText = (currentT as any).foundResultsSpeech ? (currentT as any).foundResultsSpeech(results.length) : currentT.foundResults(results.length);
        addBotMessage(currentT.foundResults(results.length), 800, speechText);
      } else {
        const speechText = (currentT as any).noResultsSpeech || currentT.noResults;
        addBotMessage(currentT.noResults, 800, speechText);
      }
    }
  };

  const handleQuickSuggest = (val: string) => handleSend(val);

  const handleServiceSelect = (service: ServiceInfo) => {
    setSuggestions([]);
    addUserMessage(`Selected: ${service.name}`);
    setStep('CONFIRMATION');
    const confirmText = currentT.redirecting(service.name);
    const speechText = (currentT as any).redirectingSpeech ? (currentT as any).redirectingSpeech(service.name) : confirmText;
    
    setTimeout(() => {
      addBotMessage(
        <span className="text-green-600 font-medium w-full block">{confirmText} ✓</span>,
        0,
        speechText
      );
      setTimeout(() => {
        // Redirect to the active service category page instead of search
        router.push(`/category/${encodeURIComponent(service.category)}`);
        onClose();
      }, 1800);
    }, 400);
  };

  const isInputDisabled = step === 'GREETING' || step === 'CONFIRMATION';
  const placeholderText = step === 'NAME' ? currentT.placeholderName : currentT.placeholderService;

  return (
    <div className="chatbot-container flex flex-col h-full sm:h-[640px] w-full bg-white sm:rounded-3xl sm:shadow-2xl sm:border sm:border-gray-200/50 overflow-hidden sm:text-sm text-[13px] sm:animate-in sm:zoom-in-95 sm:duration-300">

      {/* === Header with Avatar === */}
      <div className="flex flex-col items-center px-4 pt-4 pb-3 bg-gradient-to-b from-indigo-700 via-blue-700 to-blue-600 text-white shrink-0 relative overflow-hidden">
        {/* Decorative sparkles */}
        <div className="absolute top-2 right-3 opacity-15">
          <Sparkles className="w-10 h-10" />
        </div>
        <div className="absolute top-2 left-3 opacity-10">
          <Sparkles className="w-7 h-7" />
        </div>

        {/* Close button (mobile) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 hover:bg-white/10 rounded-xl transition-all sm:hidden z-10"
          aria-label="Close Chat"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* AI Avatar */}
        <AvatarSpeaker isSpeaking={isSpeaking} language={language} />
      </div>

      {/* === Messages === */}
      <div
        className="flex-1 overflow-y-auto p-3 sm:p-4 bg-[#f8fafc] flex flex-col gap-1 pr-2 pb-24 custom-scroll custom-chatbot-scrollbar"
        ref={scrollRef}
      >
        <style>{`
          .custom-chatbot-scrollbar::-webkit-scrollbar { width: 5px; }
          .custom-chatbot-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 5px; }
        `}</style>

        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg.text}
            isBot={msg.isBot}
            onSpeak={msg.isBot ? (text) => speak(text, language) : undefined}
          />
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white border border-gray-200/60 rounded-[20px] rounded-bl-none px-3 py-2.5 sm:px-4 sm:py-3 flex gap-1 items-center shadow-sm">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}

        {/* Quick suggestion chips */}
        {step === 'REQUIREMENT' && !isTyping && messages.length > 0 && messages[messages.length - 1].isBot && (
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

        {/* Service results */}
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
