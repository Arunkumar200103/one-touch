"use client";

import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

interface AvatarSpeakerProps {
  isSpeaking: boolean;
  language?: string;
  className?: string;
}

export function AvatarSpeaker({ isSpeaking, language = 'en', className }: AvatarSpeakerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isSpeaking) {
      videoRef.current.play().catch(() => {
        // Requires prior user interaction on some browsers — safe to swallow
      });
    } else {
      videoRef.current.pause();
    }
  }, [isSpeaking]);

  // Tamil uses feminine "பேசுகிறாள்" (she speaks) to match the female voice
  const statusText = isSpeaking
    ? (language === 'ta' ? 'பேசுகிறாள்...' : 'Speaking...')
    : (language === 'ta' ? 'ஒன் டச் AI' : 'One Touch AI');

  const subText = language === 'ta' ? 'எப்போதும் செயலில்' : 'Always Active';

  return (
    <div className={cn('flex flex-col items-center gap-1.5 pb-1', className)}>
      <div className="relative">

        {/* Glow rings when speaking */}
        {isSpeaking && (
          <>
            <span className="absolute inset-[-2px] rounded-full border-[2.5px] border-blue-400/50 animate-pulse" />
            <span
              className="absolute inset-[-6px] rounded-full border border-blue-300/15"
              style={{ animation: 'pulse 2.5s cubic-bezier(0.4,0,0.6,1) infinite' }}
            />
          </>
        )}

        {/* Avatar ring */}
        <div className={cn(
          'rounded-full p-[3px] transition-all duration-700 w-[72px] h-[72px] sm:w-[84px] sm:h-[84px] flex items-center justify-center relative',
          isSpeaking
            ? 'bg-gradient-to-br from-blue-400 via-indigo-500 to-cyan-500 shadow-[0_0_18px_4px_rgba(59,130,246,0.45)]'
            : 'bg-gradient-to-br from-white/30 to-white/10'
        )}>
      <div className="rounded-full overflow-hidden w-full h-full relative border border-black/10 shadow-inner bg-black">
        <video
          ref={videoRef}
          src="/female-avatar-speaking.mp4"
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center absolute inset-0 z-10"
          poster="/ai-avatar.png"
        />
      </div>
        </div>

        {/* Active badge */}
        <span className={cn(
          'absolute bottom-0 right-1 w-3.5 h-3.5 rounded-full border-2 border-indigo-700 shadow-md z-20',
          isSpeaking ? 'bg-green-400 animate-pulse' : 'bg-green-400'
        )} />
      </div>

      {/* Name + status */}
      <div className="flex flex-col items-center leading-tight mt-1">
        <span className={cn(
          'text-[15px] sm:text-base font-bold tracking-tight transition-all duration-300',
          isSpeaking ? 'text-white' : 'text-white/90'
        )}>
          {statusText}
        </span>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className={cn(
            "w-1.5 h-1.5 rounded-full shadow-[0_0_6px_rgba(74,222,128,0.6)] transition-all",
            isSpeaking ? "bg-green-400 animate-pulse" : "bg-green-400"
          )} />
          <span className="text-[11px] text-blue-100 font-medium tracking-wide opacity-90">
            {subText}
          </span>
        </div>
      </div>
    </div>
  );
}