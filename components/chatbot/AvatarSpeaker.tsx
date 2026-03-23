"use client";

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AvatarSpeakerProps {
  isSpeaking: boolean;
  language?: string;
  className?: string;
}

export function AvatarSpeaker({ isSpeaking, language = 'en', className }: AvatarSpeakerProps) {
  const blinkRef = useRef<SVGEllipseElement>(null);
  const blinkRef2 = useRef<SVGEllipseElement>(null);

  // Natural random blinking
  useEffect(() => {
    const blink = () => {
      [blinkRef.current, blinkRef2.current].forEach(el => {
        if (!el) return;
        el.style.transition = 'transform 0.05s ease-in-out';
        el.style.transform = 'scaleY(0.05)';
        setTimeout(() => {
          if (el) el.style.transform = 'scaleY(1)';
        }, 130);
      });
    };
    const scheduleNext = () => {
      const delay = 2500 + Math.random() * 3500;
      return setTimeout(() => { blink(); timerId = scheduleNext(); }, delay);
    };
    let timerId = scheduleNext();
    return () => clearTimeout(timerId);
  }, []);

  return (
    <div className={cn('flex flex-col items-center gap-1', className)}>
      {/* Glow ring */}
      <div
        className={cn(
          'relative rounded-full transition-all duration-300',
          isSpeaking
            ? 'shadow-[0_0_20px_6px_rgba(99,102,241,0.55)] scale-105'
            : 'shadow-[0_0_8px_2px_rgba(99,102,241,0.18)]'
        )}
      >
        {/* Avatar face SVG */}
        <svg
          viewBox="0 0 120 120"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="faceGrad" cx="50%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#e8d5c4" />
              <stop offset="100%" stopColor="#c9a98e" />
            </radialGradient>
            <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#4338ca" />
            </radialGradient>
            <radialGradient id="irisGrad" cx="38%" cy="38%" r="55%">
              <stop offset="0%" stopColor="#6b9dfc" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </radialGradient>
          </defs>

          {/* Background */}
          <circle cx="60" cy="60" r="60" fill="url(#bgGrad)" />

          {/* Neck */}
          <rect x="48" y="90" width="24" height="15" rx="6" fill="url(#faceGrad)" />

          {/* Face */}
          <ellipse cx="60" cy="62" rx="32" ry="36" fill="url(#faceGrad)" />

          {/* Hair */}
          <ellipse cx="60" cy="30" rx="33" ry="20" fill="#2d1b06" />
          <rect x="27" y="28" width="10" height="22" rx="5" fill="#2d1b06" />
          <rect x="83" y="28" width="10" height="22" rx="5" fill="#2d1b06" />

          {/* Left eye white */}
          <ellipse cx="46" cy="57" rx="8" ry="8" fill="white" />
          {/* Right eye white */}
          <ellipse cx="74" cy="57" rx="8" ry="8" fill="white" />

          {/* Left iris */}
          <ellipse ref={blinkRef} cx="46" cy="57" rx="5.5" ry="5.5" fill="url(#irisGrad)" style={{ transformOrigin: '46px 57px' }} />
          <circle cx="44" cy="55" r="1.5" fill="white" opacity="0.8" />
          <circle cx="46" cy="57" r="2.2" fill="#0f172a" />

          {/* Right iris */}
          <ellipse ref={blinkRef2} cx="74" cy="57" rx="5.5" ry="5.5" fill="url(#irisGrad)" style={{ transformOrigin: '74px 57px' }} />
          <circle cx="72" cy="55" r="1.5" fill="white" opacity="0.8" />
          <circle cx="74" cy="57" r="2.2" fill="#0f172a" />

          {/* Eyebrows */}
          <path d="M38 48 Q46 44 54 48" stroke="#5c3d11" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <path d="M66 48 Q74 44 82 48" stroke="#5c3d11" strokeWidth="2.2" fill="none" strokeLinecap="round" />

          {/* Nose */}
          <path d="M60 62 Q57 70 59 73 Q60 74 61 73 Q63 70 60 62Z" fill="#b8967a" opacity="0.6" />

          {/* Mouth — animates when speaking */}
          <g style={{ transformOrigin: '60px 83px' }}>
            {isSpeaking ? (
              // Speaking: animated open mouth
              <>
                <style>{`
                  @keyframes lipSync {
                    0%,100% { d: path("M50 82 Q60 92 70 82"); }
                    25%     { d: path("M50 80 Q60 96 70 80"); }
                    50%     { d: path("M50 82 Q60 90 70 82"); }
                    75%     { d: path("M50 81 Q60 94 70 81"); }
                  }
                  @keyframes lipSyncTop {
                    0%,100% { d: path("M50 82 Q60 78 70 82"); }
                    25%     { d: path("M50 80 Q60 75 70 80"); }
                    50%     { d: path("M50 82 Q60 77 70 82"); }
                    75%     { d: path("M50 81 Q60 76 70 81"); }
                  }
                `}</style>
                {/* Mouth cavity */}
                <path d="M50 82 Q60 96 70 82 Q60 78 50 82Z" fill="#8B2534" style={{ animation: 'lipSync 0.28s ease-in-out infinite' }} />
                {/* Upper lip */}
                <path d="M50 82 Q60 78 70 82" stroke="#c0725f" strokeWidth="1.8" fill="none" strokeLinecap="round" style={{ animation: 'lipSyncTop 0.28s ease-in-out infinite' }} />
                {/* Teeth hint */}
                <path d="M53 83 Q60 86 67 83" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
              </>
            ) : (
              // Idle: gentle smile
              <path d="M50 82 Q60 90 70 82" stroke="#c0725f" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            )}
          </g>

          {/* Cheek blush */}
          <ellipse cx="38" cy="70" rx="6" ry="4" fill="#ffb3a7" opacity="0.35" />
          <ellipse cx="82" cy="70" rx="6" ry="4" fill="#ffb3a7" opacity="0.35" />
        </svg>

        {/* Speaking sound-wave bars */}
        {isSpeaking && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-end gap-0.5">
            {[1, 2, 3, 4, 3, 2, 1].map((h, i) => (
              <span
                key={i}
                className="w-1 rounded-full bg-indigo-400"
                style={{
                  height: `${h * 3}px`,
                  animation: `soundBar 0.6s ease-in-out ${i * 0.08}s infinite alternate`,
                }}
              />
            ))}
            <style>{`
              @keyframes soundBar {
                from { transform: scaleY(0.4); opacity: 0.5; }
                to   { transform: scaleY(1.6); opacity: 1;   }
              }
            `}</style>
          </div>
        )}
      </div>

      {/* Status text */}
      <span className={cn(
        'text-[10px] font-semibold tracking-wide transition-all duration-300',
        isSpeaking ? 'text-indigo-400 animate-pulse' : 'text-white/60'
      )}>
        {isSpeaking ? (language === 'ta' ? 'பேசுகிறது...' : 'Speaking...') : 'One Touch AI'}
      </span>
    </div>
  );
}
