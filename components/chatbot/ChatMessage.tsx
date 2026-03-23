import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string | React.ReactNode;
  isBot: boolean;
}

export function ChatMessage({ message, isBot }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex w-full mb-4 opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div
        className={cn(
          "max-w-[85%] rounded-[20px] px-3 py-2 sm:px-4 sm:py-2.5 sm:text-sm text-[13px] shadow-sm leading-relaxed",
          isBot
            ? "bg-white border border-gray-200/60 text-gray-800 rounded-bl-none shadow-sm"
            : "bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-br-none shadow-blue-200/50 shadow-md"
        )}
      >
        {message}
      </div>
    </div>
  );
}
