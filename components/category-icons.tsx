"use client";

import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

// ─── Flaticon "Lineal Color" Style Icons ───
// Thin clean outlines, detailed illustrations, skin-tone elements, vibrant flat fills

export function ElectronicsIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Hand */}
      <path d="M10 42C10 42 14 38 18 40L22 42C24 43 26 42 26 40V36" fill="#F5C6A0" stroke="#2D3436" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 48L10 42" stroke="#2D3436" strokeWidth="1.8" strokeLinecap="round" />
      {/* Phone body */}
      <rect x="26" y="10" width="22" height="38" rx="3" fill="#3498DB" stroke="#2D3436" strokeWidth="1.8" strokeLinejoin="round" />
      {/* Screen */}
      <rect x="29" y="16" width="16" height="24" rx="1.5" fill="#E8F4FD" stroke="#2D3436" strokeWidth="1.2" />
      {/* Screen content */}
      <rect x="32" y="20" width="10" height="2.5" rx="1" fill="#2ECC71" />
      <rect x="32" y="25" width="7" height="2" rx="1" fill="#3498DB" />
      <rect x="32" y="30" width="10" height="5" rx="1" fill="#F39C12" />
      {/* Home button */}
      <circle cx="37" cy="44" r="2" fill="#E8F4FD" stroke="#2D3436" strokeWidth="1.2" />
      {/* Camera dot */}
      <circle cx="37" cy="13.5" r="1" fill="#2D3436" />
      {/* Signal waves */}
      <path d="M50 14C52 14 54 16 54 18" stroke="#3498DB" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M50 10C54 10 58 14 58 18" stroke="#3498DB" strokeWidth="1.5" strokeLinecap="round" />
      {/* Small gear accent */}
      <circle cx="14" cy="28" r="5" fill="#F39C12" stroke="#2D3436" strokeWidth="1.5" />
      <circle cx="14" cy="28" r="2" fill="#FFF" stroke="#2D3436" strokeWidth="1" />
    </svg>
  );
}

export function CCTVIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Wall mount */}
      <rect x="4" y="8" width="8" height="20" rx="2" fill="#B0BEC5" stroke="#2D3436" strokeWidth="1.8" />
      {/* Arm */}
      <path d="M12 16H22" stroke="#2D3436" strokeWidth="2.5" strokeLinecap="round" />
      {/* Camera body */}
      <rect x="20" y="10" width="28" height="16" rx="3" fill="#2D3436" stroke="#2D3436" strokeWidth="1.8" />
      {/* Lens housing */}
      <circle cx="40" cy="18" r="6" fill="#546E7A" stroke="#2D3436" strokeWidth="1.5" />
      <circle cx="40" cy="18" r="3.5" fill="#78909C" stroke="#2D3436" strokeWidth="1.2" />
      <circle cx="40" cy="18" r="1.5" fill="#E74C3C" />
      {/* LED indicator */}
      <circle cx="25" cy="14" r="1.5" fill="#E74C3C" stroke="#2D3436" strokeWidth="0.8" />
      {/* IR LEDs around lens */}
      <circle cx="40" cy="11" r="1" fill="#E74C3C" opacity="0.6" />
      <circle cx="40" cy="25" r="1" fill="#E74C3C" opacity="0.6" />
      <circle cx="33" cy="18" r="1" fill="#E74C3C" opacity="0.6" />
      <circle cx="47" cy="18" r="1" fill="#E74C3C" opacity="0.6" />
      {/* Cable */}
      <path d="M12 24C12 24 16 32 16 36" stroke="#2D3436" strokeWidth="1.5" strokeLinecap="round" />
      {/* Shield badge */}
      <path d="M48 34L56 30V40C56 44 52 48 48 50C44 48 40 44 40 40V30L48 34Z" fill="#2ECC71" stroke="#2D3436" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M44 40L47 43L53 36" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Monitor */}
      <rect x="4" y="40" width="20" height="14" rx="2" fill="#3498DB" stroke="#2D3436" strokeWidth="1.8" />
      <rect x="7" y="43" width="14" height="8" rx="1" fill="#E8F4FD" stroke="#2D3436" strokeWidth="1" />
      {/* Grid lines on monitor */}
      <line x1="14" y1="43" x2="14" y2="51" stroke="#3498DB" strokeWidth="0.8" />
      <line x1="7" y1="47" x2="21" y2="47" stroke="#3498DB" strokeWidth="0.8" />
      <rect x="10" y="54" width="8" height="2" rx="1" fill="#B0BEC5" stroke="#2D3436" strokeWidth="1" />
    </svg>
  );
}

export function FurnitureIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Sofa back */}
      <path d="M10 20C10 16 13 14 16 14H48C51 14 54 16 54 20V32H10V20Z" fill="#F39C12" stroke="#2D3436" strokeWidth="1.8" strokeLinejoin="round" />
      {/* Back cushion detail */}
      <line x1="26" y1="16" x2="26" y2="30" stroke="#E67E22" strokeWidth="1.2" />
      <line x1="38" y1="16" x2="38" y2="30" stroke="#E67E22" strokeWidth="1.2" />
      {/* Seat cushion */}
      <rect x="8" y="30" width="48" height="10" rx="3" fill="#E67E22" stroke="#2D3436" strokeWidth="1.8" strokeLinejoin="round" />
      {/* Armrest left */}
      <path d="M4 22C4 20 6 18 8 18V40C6 40 4 38 4 36V22Z" fill="#F1C40F" stroke="#2D3436" strokeWidth="1.8" strokeLinejoin="round" />
      {/* Armrest right */}
      <path d="M60 22C60 20 58 18 56 18V40C58 40 60 38 60 36V22Z" fill="#F1C40F" stroke="#2D3436" strokeWidth="1.8" strokeLinejoin="round" />
      {/* Legs */}
      <rect x="12" y="40" width="3" height="8" rx="1" fill="#8D6E63" stroke="#2D3436" strokeWidth="1.5" />
      <rect x="49" y="40" width="3" height="8" rx="1" fill="#8D6E63" stroke="#2D3436" strokeWidth="1.5" />
      {/* Pillows */}
      <ellipse cx="20" cy="22" rx="5" ry="6" fill="#E74C3C" stroke="#2D3436" strokeWidth="1.5" />
      <ellipse cx="44" cy="22" rx="5" ry="6" fill="#3498DB" stroke="#2D3436" strokeWidth="1.5" />
      {/* Lamp */}
      <line x1="56" y1="6" x2="56" y2="16" stroke="#2D3436" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M50 6L56 2L62 6" fill="#F1C40F" stroke="#2D3436" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function ConstructionIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Hard hat */}
      <path d="M16 28C16 18 22 12 32 12C42 12 48 18 48 28H16Z" fill="#F1C40F" stroke="#2D3436" strokeWidth="1.8" strokeLinejoin="round" />
      <rect x="14" y="28" width="36" height="5" rx="2" fill="#F39C12" stroke="#2D3436" strokeWidth="1.8" />
      {/* Hat band */}
      <line x1="20" y1="20" x2="44" y2="20" stroke="#E67E22" strokeWidth="1.5" strokeLinecap="round" />
      {/* Person face */}
      <circle cx="32" cy="40" r="6" fill="#F5C6A0" stroke="#2D3436" strokeWidth="1.8" />
      <circle cx="30" cy="39" r="1" fill="#2D3436" />
      <circle cx="34" cy="39" r="1" fill="#2D3436" />
      <path d="M30 42C30 42 32 44 34 42" stroke="#2D3436" strokeWidth="1" strokeLinecap="round" />
      {/* Body/vest */}
      <path d="M22 50C22 46 26 44 32 44C38 44 42 46 42 50V56H22V50Z" fill="#E67E22" stroke="#2D3436" strokeWidth="1.8" strokeLinejoin="round" />
      {/* Vest stripes */}
      <line x1="22" y1="50" x2="42" y2="50" stroke="#F1C40F" strokeWidth="2" />
      <line x1="22" y1="54" x2="42" y2="54" stroke="#F1C40F" strokeWidth="2" />
      {/* Brick */}
      <rect x="46" y="42" width="14" height="8" rx="1" fill="#E74C3C" stroke="#2D3436" strokeWidth="1.5" />
      <line x1="53" y1="42" x2="53" y2="50" stroke="#2D3436" strokeWidth="1" />
      <rect x="48" y="50" width="14" height="8" rx="1" fill="#E74C3C" stroke="#2D3436" strokeWidth="1.5" />
      <line x1="55" y1="50" x2="55" y2="58" stroke="#2D3436" strokeWidth="1" />
      {/* Trowel */}
      <path d="M4 52L12 44L16 48L8 56Z" fill="#B0BEC5" stroke="#2D3436" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="2" y="54" width="8" height="3" rx="1" fill="#8D6E63" stroke="#2D3436" strokeWidth="1" transform="rotate(-45 6 55)" />
    </svg>
  );
}

export function FabricationIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Hand holding */}
      <path d="M8 50C8 50 12 44 18 44H26C28 44 30 46 30 48V54H10L8 50Z" fill="#F5C6A0" stroke="#2D3436" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Toolbox */}
      <rect x="18" y="20" width="36" height="22" rx="3" fill="#E67E22" stroke="#2D3436" strokeWidth="1.8" strokeLinejoin="round" />
      <rect x="18" y="28" width="36" height="2" fill="#D35400" stroke="#2D3436" strokeWidth="1" />
      {/* Handle */}
      <path d="M30 20V16H42V20" stroke="#2D3436" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="28" y="14" width="16" height="4" rx="1.5" fill="#B0BEC5" stroke="#2D3436" strokeWidth="1.5" />
      {/* Latch */}
      <rect x="33" y="26" width="6" height="6" rx="1" fill="#F1C40F" stroke="#2D3436" strokeWidth="1.5" />
      {/* Wrench sticking out */}
      <path d="M48 16L52 8" stroke="#B0BEC5" strokeWidth="3" strokeLinecap="round" />
      <circle cx="53" cy="6" r="4" fill="#B0BEC5" stroke="#2D3436" strokeWidth="1.5" />
      <circle cx="53" cy="6" r="1.5" fill="#FFF" />
      {/* Gear accent */}
      <circle cx="10" cy="24" r="7" fill="#3498DB" stroke="#2D3436" strokeWidth="1.8" />
      <circle cx="10" cy="24" r="3" fill="#E8F4FD" stroke="#2D3436" strokeWidth="1.2" />
      <circle cx="10" cy="24" r="1" fill="#2D3436" />
      {/* Gear teeth */}
      <rect x="8.5" y="15.5" width="3" height="3" rx="0.5" fill="#3498DB" stroke="#2D3436" strokeWidth="1" />
      <rect x="8.5" y="29.5" width="3" height="3" rx="0.5" fill="#3498DB" stroke="#2D3436" strokeWidth="1" />
      <rect x="1.5" y="22.5" width="3" height="3" rx="0.5" fill="#3498DB" stroke="#2D3436" strokeWidth="1" />
      <rect x="15.5" y="22.5" width="3" height="3" rx="0.5" fill="#3498DB" stroke="#2D3436" strokeWidth="1" />
    </svg>
  );
}

export function TechnologyIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Person */}
      <circle cx="18" cy="14" r="6" fill="#F5C6A0" stroke="#2D3436" strokeWidth="1.8" />
      {/* Hair */}
      <path d="M12 12C12 8 14 6 18 6C22 6 24 8 24 12" fill="#8D6E63" stroke="#2D3436" strokeWidth="1.5" />
      {/* Eyes */}
      <circle cx="16" cy="14" r="1" fill="#2D3436" />
      <circle cx="20" cy="14" r="1" fill="#2D3436" />
      {/* Body */}
      <path d="M10 28C10 24 13 22 18 22C23 22 26 24 26 28V34H10V28Z" fill="#3498DB" stroke="#2D3436" strokeWidth="1.8" strokeLinejoin="round" />
      {/* Laptop */}
      <rect x="24" y="26" width="34" height="22" rx="2.5" fill="#546E7A" stroke="#2D3436" strokeWidth="1.8" />
      {/* Screen */}
      <rect x="27" y="29" width="28" height="16" rx="1.5" fill="#E8F4FD" stroke="#2D3436" strokeWidth="1.2" />
      {/* Code lines on screen */}
      <rect x="30" y="32" width="12" height="2" rx="1" fill="#2ECC71" />
      <rect x="30" y="36" width="18" height="2" rx="1" fill="#3498DB" />
      <rect x="30" y="40" width="8" height="2" rx="1" fill="#F39C12" />
      {/* Keyboard base */}
      <path d="M22 48H60L58 52H24L22 48Z" fill="#78909C" stroke="#2D3436" strokeWidth="1.8" strokeLinejoin="round" />
      {/* Arms on keyboard */}
      <path d="M26 32L30 42L36 48" stroke="#F5C6A0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* Chat bubble accent */}
      <path d="M46 12H58C59.1 12 60 12.9 60 14V20C60 21.1 59.1 22 58 22H52L48 26V22H46C44.9 22 44 21.1 44 20V14C44 12.9 44.9 12 46 12Z" fill="#2ECC71" stroke="#2D3436" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="48" y1="16" x2="56" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="48" y1="19" x2="53" y2="19" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function EducationIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Graduation cap top */}
      <path d="M32 6L4 22L32 38L60 22L32 6Z" fill="#2D3436" stroke="#2D3436" strokeWidth="1.8" strokeLinejoin="round" />
      {/* Cap board shine */}
      <path d="M32 10L14 22L32 34L50 22L32 10Z" fill="#455A64" />
      {/* Tassel string */}
      <line x1="56" y1="22" x2="56" y2="38" stroke="#F1C40F" strokeWidth="2" strokeLinecap="round" />
      {/* Tassel end */}
      <path d="M54 38L56 40L58 38" stroke="#F1C40F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="54" y1="38" x2="54" y2="44" stroke="#F1C40F" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="56" y1="40" x2="56" y2="46" stroke="#F1C40F" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="58" y1="38" x2="58" y2="44" stroke="#F1C40F" strokeWidth="1.5" strokeLinecap="round" />
      {/* Draping sides */}
      <path d="M16 28V44C16 44 22 54 32 54C42 54 48 44 48 44V28" fill="#3498DB" stroke="#2D3436" strokeWidth="1.8" strokeLinejoin="round" />
      {/* Drape fold line */}
      <path d="M24 34V48" stroke="#2980B9" strokeWidth="1.2" />
      <path d="M40 34V48" stroke="#2980B9" strokeWidth="1.2" />
      {/* Book */}
      <rect x="26" y="38" width="12" height="9" rx="1" fill="#F1C40F" stroke="#2D3436" strokeWidth="1.5" />
      <line x1="32" y1="38" x2="32" y2="47" stroke="#2D3436" strokeWidth="1" />
      {/* Star accent */}
      <path d="M8 10L9.5 13L13 13.5L10.5 16L11 19.5L8 17.5L5 19.5L5.5 16L3 13.5L6.5 13Z" fill="#F1C40F" stroke="#2D3436" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}

export function FinanceIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Hand */}
      <path d="M6 44L12 38C14 36 18 36 20 38L24 42" fill="#F5C6A0" stroke="#2D3436" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 54L6 44" stroke="#2D3436" strokeWidth="1.8" strokeLinecap="round" />
      {/* Money bag */}
      <path d="M24 26C24 20 28 16 36 16C44 16 48 20 48 26V42C48 47 44 50 36 50C28 50 24 47 24 42V26Z" fill="#2ECC71" stroke="#2D3436" strokeWidth="1.8" strokeLinejoin="round" />
      {/* Bag top tie */}
      <path d="M30 16C30 16 32 8 36 8C40 8 42 16 42 16" fill="#27AE60" stroke="#2D3436" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="32" y="14" width="8" height="4" rx="2" fill="#F1C40F" stroke="#2D3436" strokeWidth="1.5" />
      {/* Rupee symbol */}
      <text x="36" y="38" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="sans-serif">₹</text>
      {/* Coins stack */}
      <ellipse cx="54" cy="44" rx="7" ry="3" fill="#F1C40F" stroke="#2D3436" strokeWidth="1.5" />
      <rect x="47" y="41" width="14" height="3" fill="#F1C40F" stroke="#2D3436" strokeWidth="1" />
      <ellipse cx="54" cy="41" rx="7" ry="3" fill="#F39C12" stroke="#2D3436" strokeWidth="1.5" />
      <rect x="47" y="38" width="14" height="3" fill="#F39C12" stroke="#2D3436" strokeWidth="1" />
      <ellipse cx="54" cy="38" rx="7" ry="3" fill="#F1C40F" stroke="#2D3436" strokeWidth="1.5" />
      {/* Growth arrow */}
      <path d="M12 20L18 14L24 18L30 10" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 10H30V14" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function RealEstateIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Building */}
      <rect x="16" y="20" width="22" height="36" rx="1.5" fill="#3498DB" stroke="#2D3436" strokeWidth="1.8" strokeLinejoin="round" />
      {/* Roof */}
      <path d="M12 22L27 8L42 22" fill="#E74C3C" stroke="#2D3436" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Windows */}
      <rect x="20" y="26" width="5" height="5" rx="0.5" fill="#F1C40F" stroke="#2D3436" strokeWidth="1.2" />
      <rect x="29" y="26" width="5" height="5" rx="0.5" fill="#F1C40F" stroke="#2D3436" strokeWidth="1.2" />
      <rect x="20" y="35" width="5" height="5" rx="0.5" fill="#F1C40F" stroke="#2D3436" strokeWidth="1.2" />
      <rect x="29" y="35" width="5" height="5" rx="0.5" fill="#F1C40F" stroke="#2D3436" strokeWidth="1.2" />
      {/* Door */}
      <rect x="24" y="46" width="8" height="10" rx="1" fill="#8D6E63" stroke="#2D3436" strokeWidth="1.2" />
      <circle cx="30" cy="52" r="1" fill="#F1C40F" />
      {/* Person/Agent */}
      <circle cx="52" cy="26" r="5" fill="#F5C6A0" stroke="#2D3436" strokeWidth="1.8" />
      <circle cx="50.5" cy="25.5" r="0.8" fill="#2D3436" />
      <circle cx="53.5" cy="25.5" r="0.8" fill="#2D3436" />
      <path d="M50.5 28C50.5 28 52 29.5 53.5 28" stroke="#2D3436" strokeWidth="1" strokeLinecap="round" />
      {/* Agent body */}
      <path d="M44 42C44 38 47 34 52 34C57 34 60 38 60 42V48H44V42Z" fill="#2D3436" stroke="#2D3436" strokeWidth="1.8" />
      {/* Tie */}
      <path d="M52 34L50 40L52 46L54 40L52 34Z" fill="#E74C3C" stroke="#2D3436" strokeWidth="1" />
      {/* Key */}
      <circle cx="8" cy="44" r="4" fill="#F1C40F" stroke="#2D3436" strokeWidth="1.5" />
      <circle cx="8" cy="44" r="1.5" fill="#FFF" />
      <line x1="12" y1="44" x2="18" y2="44" stroke="#2D3436" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="44" x2="16" y2="48" stroke="#2D3436" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function RestaurantsIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Plate */}
      <ellipse cx="32" cy="46" rx="24" ry="8" fill="#ECEFF1" stroke="#2D3436" strokeWidth="1.8" />
      <ellipse cx="32" cy="44" rx="18" ry="5" fill="#F5F5F5" stroke="#2D3436" strokeWidth="1.2" />
      {/* Cloche dome */}
      <path d="M12 42C12 26 20 16 32 16C44 16 52 26 52 42" fill="#F39C12" stroke="#2D3436" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 42C16 30 22 20 32 20C42 20 48 30 48 42" fill="#F1C40F" />
      {/* Handle */}
      <ellipse cx="32" cy="14" rx="4" ry="2.5" fill="#E74C3C" stroke="#2D3436" strokeWidth="1.8" />
      {/* Steam lines */}
      <path d="M24 10C24 10 22 6 24 3" stroke="#B0BEC5" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M32 8C32 8 30 4 32 1" stroke="#B0BEC5" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M40 10C40 10 38 6 40 3" stroke="#B0BEC5" strokeWidth="1.5" strokeLinecap="round" />
      {/* Stars accent */}
      <path d="M56 20L57.5 23L61 23.5L58.5 26L59 29.5L56 27.5L53 29.5L53.5 26L51 23.5L54.5 23Z" fill="#F1C40F" stroke="#2D3436" strokeWidth="1" strokeLinejoin="round" />
      <path d="M6 24L7 26L9 26.3L7.5 28L8 30L6 29L4 30L4.5 28L3 26.3L5 26Z" fill="#F1C40F" stroke="#2D3436" strokeWidth="0.8" strokeLinejoin="round" />
    </svg>
  );
}

export function BeautySpaIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Woman face */}
      <circle cx="32" cy="22" r="10" fill="#F5C6A0" stroke="#2D3436" strokeWidth="1.8" />
      {/* Hair */}
      <path d="M22 20C22 12 26 8 32 8C38 8 42 12 42 20" fill="#5D4037" stroke="#2D3436" strokeWidth="1.5" />
      <path d="M22 20C22 20 20 22 20 26" stroke="#5D4037" strokeWidth="2" strokeLinecap="round" />
      <path d="M42 20C42 20 44 22 44 26" stroke="#5D4037" strokeWidth="2" strokeLinecap="round" />
      {/* Eyes */}
      <ellipse cx="29" cy="22" rx="1.2" ry="1.5" fill="#2D3436" />
      <ellipse cx="35" cy="22" rx="1.2" ry="1.5" fill="#2D3436" />
      {/* Lips */}
      <path d="M30 26C30 26 32 28 34 26" stroke="#E74C3C" strokeWidth="1.2" strokeLinecap="round" />
      {/* Headband/spa wrap */}
      <rect x="22" y="14" width="20" height="4" rx="2" fill="#E91E63" stroke="#2D3436" strokeWidth="1.5" />
      {/* Flower on headband */}
      <circle cx="38" cy="14" r="3" fill="#FF9EC6" stroke="#2D3436" strokeWidth="1" />
      <circle cx="38" cy="14" r="1" fill="#F1C40F" />
      {/* Body/towel */}
      <path d="M22 34C22 32 26 30 32 30C38 30 42 32 42 34V42H22V34Z" fill="white" stroke="#2D3436" strokeWidth="1.8" />
      {/* Lotus icon at bottom */}
      <ellipse cx="32" cy="54" rx="4" ry="6" fill="#E91E63" stroke="#2D3436" strokeWidth="1.2" />
      <ellipse cx="24" cy="54" rx="4" ry="5" fill="#FF9EC6" stroke="#2D3436" strokeWidth="1.2" transform="rotate(-20 24 54)" />
      <ellipse cx="40" cy="54" rx="4" ry="5" fill="#FF9EC6" stroke="#2D3436" strokeWidth="1.2" transform="rotate(20 40 54)" />
      <circle cx="32" cy="52" r="2" fill="#F1C40F" stroke="#2D3436" strokeWidth="1" />
      {/* Sparkle */}
      <path d="M50 18L51 14L52 18L51 22Z" fill="#F1C40F" stroke="#2D3436" strokeWidth="0.8" />
      <path d="M48 18H54" stroke="#F1C40F" strokeWidth="1" strokeLinecap="round" />
      <path d="M12 28L13 24L14 28L13 32Z" fill="#F1C40F" stroke="#2D3436" strokeWidth="0.8" />
    </svg>
  );
}

export function HomeDecorIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Wall */}
      <rect x="4" y="12" width="56" height="44" rx="2" fill="#FFF3E0" stroke="#2D3436" strokeWidth="1.8" />
      {/* Picture frame */}
      <rect x="10" y="18" width="18" height="14" rx="1" fill="#3498DB" stroke="#2D3436" strokeWidth="1.5" />
      <rect x="12" y="20" width="14" height="10" rx="0.5" fill="#87CEEB" stroke="#2D3436" strokeWidth="1" />
      {/* Mountain in frame */}
      <path d="M12 30L18 22L24 28L26 26" fill="#2ECC71" stroke="#2D3436" strokeWidth="0.8" />
      <circle cx="23" cy="23" r="2" fill="#F1C40F" />
      {/* Plant vase */}
      <path d="M40 36L38 48H48L46 36Z" fill="#E74C3C" stroke="#2D3436" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="36" y="34" width="14" height="3" rx="1" fill="#C0392B" stroke="#2D3436" strokeWidth="1.2" />
      {/* Plant leaves */}
      <path d="M43 34C43 34 40 26 36 24" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" />
      <path d="M43 34C43 34 46 26 50 24" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" />
      <path d="M43 32C43 32 43 24 43 20" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" />
      {/* Leaf shapes */}
      <ellipse cx="34" cy="23" rx="3" ry="2" fill="#2ECC71" stroke="#2D3436" strokeWidth="1" transform="rotate(-30 34 23)" />
      <ellipse cx="52" cy="23" rx="3" ry="2" fill="#2ECC71" stroke="#2D3436" strokeWidth="1" transform="rotate(30 52 23)" />
      <ellipse cx="43" cy="18" rx="2" ry="3" fill="#27AE60" stroke="#2D3436" strokeWidth="1" />
      {/* Lamp on wall */}
      <path d="M16 42L14 48L22 48L20 42Z" fill="#F1C40F" stroke="#2D3436" strokeWidth="1.2" strokeLinejoin="round" />
      <rect x="16" y="40" width="4" height="3" rx="0.5" fill="#F39C12" stroke="#2D3436" strokeWidth="1" />
      <line x1="18" y1="38" x2="18" y2="40" stroke="#2D3436" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function WeddingIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Ring */}
      <ellipse cx="32" cy="40" rx="16" ry="14" fill="none" stroke="#F1C40F" strokeWidth="4" />
      <ellipse cx="32" cy="40" rx="16" ry="14" fill="none" stroke="#2D3436" strokeWidth="1.8" />
      <ellipse cx="32" cy="40" rx="12" ry="10" fill="none" stroke="#2D3436" strokeWidth="1" />
      {/* Ring gold fill */}
      <path d="M16 40C16 30 23 28 32 28C41 28 48 30 48 40" fill="#F1C40F" stroke="#2D3436" strokeWidth="1.5" />
      {/* Diamond */}
      <path d="M24 22L32 8L40 22L32 30L24 22Z" fill="#87CEEB" stroke="#2D3436" strokeWidth="1.8" strokeLinejoin="round" />
      {/* Diamond facets */}
      <path d="M28 15L36 15" stroke="#2D3436" strokeWidth="1.2" />
      <path d="M28 15L32 22" stroke="#2D3436" strokeWidth="0.8" />
      <path d="M36 15L32 22" stroke="#2D3436" strokeWidth="0.8" />
      <path d="M32 8L32 15" stroke="#B0BEC5" strokeWidth="0.8" />
      {/* Diamond shine */}
      <path d="M26 18L30 22" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      {/* Sparkles */}
      <path d="M52 10L53 6L54 10L53 14Z" fill="#F1C40F" stroke="#2D3436" strokeWidth="0.8" />
      <path d="M50 10H56" stroke="#F1C40F" strokeWidth="1" strokeLinecap="round" />
      <path d="M10 16L11 12L12 16L11 20Z" fill="#F1C40F" stroke="#2D3436" strokeWidth="0.8" />
      <path d="M8 16H14" stroke="#F1C40F" strokeWidth="1" strokeLinecap="round" />
      {/* Hearts */}
      <path d="M54 28C55 26 58 26 58 28C58 30 54 34 54 34C54 34 50 30 50 28C50 26 53 26 54 28Z" fill="#E74C3C" stroke="#2D3436" strokeWidth="1" />
      <path d="M8 34C9 32 12 32 12 34C12 36 8 40 8 40C8 40 4 36 4 34C4 32 7 32 8 34Z" fill="#E74C3C" stroke="#2D3436" strokeWidth="1" />
    </svg>
  );
}

export function RentHireIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Hand holding key */}
      <path d="M4 46C4 46 8 40 14 40H22C24 40 26 42 26 44V50H8L4 46Z" fill="#F5C6A0" stroke="#2D3436" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Car body */}
      <path d="M26 26H56C58.2 26 60 27.8 60 30V38H24V30C24 27.8 24.8 26 26 26Z" fill="#3498DB" stroke="#2D3436" strokeWidth="1.8" strokeLinejoin="round" />
      {/* Car roof */}
      <path d="M30 26L34 16H50L54 26" fill="#2980B9" stroke="#2D3436" strokeWidth="1.8" strokeLinejoin="round" />
      {/* Windows */}
      <path d="M34 26L36 18H40V26" fill="#87CEEB" stroke="#2D3436" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M44 26V18H48L50 26" fill="#87CEEB" stroke="#2D3436" strokeWidth="1.2" strokeLinejoin="round" />
      {/* Wheels */}
      <circle cx="32" cy="40" r="5" fill="#455A64" stroke="#2D3436" strokeWidth="1.8" />
      <circle cx="32" cy="40" r="2" fill="#B0BEC5" />
      <circle cx="52" cy="40" r="5" fill="#455A64" stroke="#2D3436" strokeWidth="1.8" />
      <circle cx="52" cy="40" r="2" fill="#B0BEC5" />
      {/* Headlight */}
      <rect x="56" y="30" width="4" height="3" rx="1" fill="#F1C40F" stroke="#2D3436" strokeWidth="1" />
      {/* Tail light */}
      <rect x="24" y="30" width="3" height="3" rx="1" fill="#E74C3C" stroke="#2D3436" strokeWidth="1" />
      {/* Key */}
      <circle cx="14" cy="22" r="5" fill="#F1C40F" stroke="#2D3436" strokeWidth="1.8" />
      <circle cx="14" cy="22" r="2" fill="#FFF" stroke="#2D3436" strokeWidth="1" />
      <line x1="19" y1="22" x2="28" y2="22" stroke="#2D3436" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="24" y1="22" x2="24" y2="26" stroke="#2D3436" strokeWidth="2" strokeLinecap="round" />
      <line x1="27" y1="22" x2="27" y2="25" stroke="#2D3436" strokeWidth="2" strokeLinecap="round" />
      {/* 24/7 badge */}
      <circle cx="54" cy="12" r="7" fill="#2ECC71" stroke="#2D3436" strokeWidth="1.5" />
      <text x="54" y="15" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="sans-serif">24/7</text>
    </svg>
  );
}

export function HotelsIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Main building */}
      <rect x="14" y="16" width="36" height="40" rx="2" fill="#5B5EA6" stroke="#2D3436" strokeWidth="1.8" strokeLinejoin="round" />
      {/* Roof */}
      <rect x="10" y="12" width="44" height="6" rx="2" fill="#6B6EBF" stroke="#2D3436" strokeWidth="1.8" />
      {/* Sign board */}
      <rect x="22" y="4" width="20" height="10" rx="2" fill="#3498DB" stroke="#2D3436" strokeWidth="1.5" />
      <text x="32" y="12" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold" fontFamily="sans-serif">HOTEL</text>
      {/* Windows row 1 */}
      <rect x="18" y="22" width="5" height="5" rx="0.5" fill="#F1C40F" stroke="#2D3436" strokeWidth="1.2" />
      <rect x="29.5" y="22" width="5" height="5" rx="0.5" fill="#87CEEB" stroke="#2D3436" strokeWidth="1.2" />
      <rect x="41" y="22" width="5" height="5" rx="0.5" fill="#F1C40F" stroke="#2D3436" strokeWidth="1.2" />
      {/* Windows row 2 */}
      <rect x="18" y="32" width="5" height="5" rx="0.5" fill="#87CEEB" stroke="#2D3436" strokeWidth="1.2" />
      <rect x="29.5" y="32" width="5" height="5" rx="0.5" fill="#F1C40F" stroke="#2D3436" strokeWidth="1.2" />
      <rect x="41" y="32" width="5" height="5" rx="0.5" fill="#87CEEB" stroke="#2D3436" strokeWidth="1.2" />
      {/* Door */}
      <rect x="27" y="44" width="10" height="12" rx="2" fill="#E74C3C" stroke="#2D3436" strokeWidth="1.5" />
      <circle cx="35" cy="50" r="1" fill="#F1C40F" />
      {/* Awning */}
      <path d="M24 44L32 40L40 44" fill="#C0392B" stroke="#2D3436" strokeWidth="1.2" strokeLinejoin="round" />
      {/* Stars */}
      <path d="M56 18L57 21L60 21.3L58 23L58.5 26L56 24.5L53.5 26L54 23L52 21.3L55 21Z" fill="#F1C40F" stroke="#2D3436" strokeWidth="0.8" strokeLinejoin="round" />
      <path d="M6 22L7 25L10 25.3L8 27L8.5 30L6 28.5L3.5 30L4 27L2 25.3L5 25Z" fill="#F1C40F" stroke="#2D3436" strokeWidth="0.8" strokeLinejoin="round" />
    </svg>
  );
}

export function AutomotiveIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Mechanic person */}
      <circle cx="22" cy="16" r="7" fill="#F5C6A0" stroke="#2D3436" strokeWidth="1.8" />
      {/* Cap */}
      <path d="M15 14C15 10 18 8 22 8C26 8 29 10 29 14H15Z" fill="#3498DB" stroke="#2D3436" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="13" y="13" width="18" height="3" rx="1" fill="#2980B9" stroke="#2D3436" strokeWidth="1.2" />
      {/* Eyes */}
      <circle cx="20" cy="16" r="1" fill="#2D3436" />
      <circle cx="24" cy="16" r="1" fill="#2D3436" />
      <path d="M20 19C20 19 22 21 24 19" stroke="#2D3436" strokeWidth="1" strokeLinecap="round" />
      {/* Body/uniform */}
      <path d="M12 32C12 28 16 24 22 24C28 24 32 28 32 32V42H12V32Z" fill="#3498DB" stroke="#2D3436" strokeWidth="1.8" strokeLinejoin="round" />
      {/* Pocket */}
      <rect x="18" y="30" width="8" height="5" rx="1" fill="#2980B9" stroke="#2D3436" strokeWidth="1" />
      {/* Wrench in hand */}
      <path d="M32 34L42 24" stroke="#B0BEC5" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="44" cy="22" r="4" fill="#B0BEC5" stroke="#2D3436" strokeWidth="1.5" />
      <path d="M46 20L48 18" stroke="#2D3436" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M42 24L40 26" stroke="#2D3436" strokeWidth="1.5" strokeLinecap="round" />
      {/* Gear */}
      <circle cx="52" cy="40" r="8" fill="#F39C12" stroke="#2D3436" strokeWidth="1.8" />
      <circle cx="52" cy="40" r="3.5" fill="#FFF3E0" stroke="#2D3436" strokeWidth="1.2" />
      <circle cx="52" cy="40" r="1.5" fill="#2D3436" />
      {/* Gear teeth */}
      <rect x="50.5" y="30.5" width="3" height="3" rx="0.5" fill="#F39C12" stroke="#2D3436" strokeWidth="1" />
      <rect x="50.5" y="46.5" width="3" height="3" rx="0.5" fill="#F39C12" stroke="#2D3436" strokeWidth="1" />
      <rect x="42.5" y="38.5" width="3" height="3" rx="0.5" fill="#F39C12" stroke="#2D3436" strokeWidth="1" />
      <rect x="58.5" y="38.5" width="3" height="3" rx="0.5" fill="#F39C12" stroke="#2D3436" strokeWidth="1" />
    </svg>
  );
}

export function HealthIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Doctor */}
      <circle cx="24" cy="18" r="8" fill="#F5C6A0" stroke="#2D3436" strokeWidth="1.8" />
      {/* Hair */}
      <path d="M16 16C16 10 19 8 24 8C29 8 32 10 32 16" fill="#5D4037" stroke="#2D3436" strokeWidth="1.5" />
      {/* Eyes */}
      <circle cx="22" cy="18" r="1" fill="#2D3436" />
      <circle cx="26" cy="18" r="1" fill="#2D3436" />
      <path d="M22 21C22 21 24 23 26 21" stroke="#2D3436" strokeWidth="1" strokeLinecap="round" />
      {/* Stethoscope around neck */}
      <path d="M18 26C18 26 18 30 20 32" stroke="#2D3436" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="34" r="2.5" fill="#B0BEC5" stroke="#2D3436" strokeWidth="1.5" />
      {/* White coat */}
      <path d="M12 36C12 32 17 28 24 28C31 28 36 32 36 36V50H12V36Z" fill="white" stroke="#2D3436" strokeWidth="1.8" strokeLinejoin="round" />
      {/* Coat lapels */}
      <path d="M24 28L20 36" stroke="#2D3436" strokeWidth="1.2" />
      <path d="M24 28L28 36" stroke="#2D3436" strokeWidth="1.2" />
      {/* Medical cross */}
      <rect x="42" y="14" width="16" height="16" rx="3" fill="#E74C3C" stroke="#2D3436" strokeWidth="1.8" />
      <rect x="47" y="17" width="6" height="10" rx="1" fill="white" />
      <rect x="45" y="19" width="10" height="6" rx="1" fill="white" />
      {/* Heartbeat line */}
      <path d="M40 42L44 42L46 36L50 48L54 38L56 42L62 42" stroke="#E74C3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Clipboard */}
      <rect x="40" y="48" width="14" height="10" rx="1.5" fill="#F1C40F" stroke="#2D3436" strokeWidth="1.5" />
      <rect x="44" y="46" width="6" height="4" rx="1" fill="#B0BEC5" stroke="#2D3436" strokeWidth="1.2" />
      <line x1="43" y1="52" x2="51" y2="52" stroke="#2D3436" strokeWidth="1" strokeLinecap="round" />
      <line x1="43" y1="55" x2="49" y2="55" stroke="#2D3436" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function EventsIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Party popper */}
      <path d="M6 58L20 22L36 58H6Z" fill="#F1C40F" stroke="#2D3436" strokeWidth="1.8" strokeLinejoin="round" />
      {/* Cone stripes */}
      <path d="M12 48L18 30L28 48" fill="#F39C12" stroke="#2D3436" strokeWidth="1" strokeLinejoin="round" />
      {/* Confetti pieces */}
      <rect x="28" y="10" width="5" height="5" rx="1" fill="#E74C3C" stroke="#2D3436" strokeWidth="1.2" transform="rotate(15 30 12)" />
      <rect x="40" y="14" width="4" height="4" rx="1" fill="#3498DB" stroke="#2D3436" strokeWidth="1.2" transform="rotate(-10 42 16)" />
      <rect x="48" y="26" width="5" height="5" rx="1" fill="#2ECC71" stroke="#2D3436" strokeWidth="1.2" transform="rotate(25 50 28)" />
      <circle cx="36" cy="24" r="2.5" fill="#E91E63" stroke="#2D3436" strokeWidth="1.2" />
      <circle cx="52" cy="18" r="2.5" fill="#F1C40F" stroke="#2D3436" strokeWidth="1.2" />
      <circle cx="44" cy="8" r="2" fill="#9B59B6" stroke="#2D3436" strokeWidth="1" />
      {/* Star */}
      <path d="M54 6L56 10L60 10.5L57 13.5L57.5 17.5L54 15.5L50.5 17.5L51 13.5L48 10.5L52 10Z" fill="#F1C40F" stroke="#2D3436" strokeWidth="1.2" strokeLinejoin="round" />
      {/* Streamers */}
      <path d="M24 18C26 14 30 12 34 14" stroke="#E74C3C" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 20C34 16 38 14 42 18" stroke="#3498DB" strokeWidth="2" strokeLinecap="round" />
      <path d="M38 30C40 26 44 24 48 28" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" />
      {/* Music notes */}
      <path d="M56 34L56 44" stroke="#2D3436" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="54" cy="44" r="2.5" fill="#9B59B6" stroke="#2D3436" strokeWidth="1.2" />
      <path d="M56 34L60 32L60 38" stroke="#2D3436" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function EntertainmentIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Film clapperboard */}
      <rect x="8" y="20" width="40" height="32" rx="2" fill="#2D3436" stroke="#2D3436" strokeWidth="1.8" />
      {/* Clapper top */}
      <path d="M6 20L48 20L52 10L10 10Z" fill="#455A64" stroke="#2D3436" strokeWidth="1.8" strokeLinejoin="round" />
      {/* Clapper hinge */}
      <path d="M10 10L6 20" stroke="#2D3436" strokeWidth="1.8" />
      {/* Stripes on clapper */}
      <path d="M14 10L10 20" stroke="white" strokeWidth="2" />
      <path d="M22 10L18 20" stroke="white" strokeWidth="2" />
      <path d="M30 10L26 20" stroke="white" strokeWidth="2" />
      <path d="M38 10L34 20" stroke="white" strokeWidth="2" />
      <path d="M46 10L42 20" stroke="white" strokeWidth="2" />
      {/* Screen area */}
      <rect x="12" y="24" width="32" height="24" rx="1" fill="#E8F4FD" stroke="#2D3436" strokeWidth="1" />
      {/* Play button */}
      <circle cx="28" cy="36" r="8" fill="rgba(231,76,60,0.9)" stroke="white" strokeWidth="2" />
      <path d="M25 31L33 36L25 41Z" fill="white" />
      {/* Popcorn bucket */}
      <path d="M50 30L48 52H60L58 30Z" fill="#E74C3C" stroke="#2D3436" strokeWidth="1.8" strokeLinejoin="round" />
      <rect x="47" y="28" width="14" height="4" rx="1" fill="#C0392B" stroke="#2D3436" strokeWidth="1.5" />
      {/* Popcorn kernels */}
      <circle cx="52" cy="26" r="2.5" fill="#F1C40F" stroke="#2D3436" strokeWidth="1" />
      <circle cx="56" cy="25" r="2.5" fill="#F1C40F" stroke="#2D3436" strokeWidth="1" />
      <circle cx="54" cy="22" r="2.5" fill="#F39C12" stroke="#2D3436" strokeWidth="1" />
      {/* Stripe on bucket */}
      <line x1="49" y1="36" x2="59" y2="36" stroke="white" strokeWidth="1.5" />
      <line x1="49" y1="42" x2="59" y2="42" stroke="white" strokeWidth="1.5" />
      {/* Stars */}
      <path d="M4 4L5 7L8 7.3L6 9L6.5 12L4 10.5L1.5 12L2 9L0 7.3L3 7Z" fill="#F1C40F" stroke="#2D3436" strokeWidth="0.8" strokeLinejoin="round" />
    </svg>
  );
}

export function LegalIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Balance post */}
      <rect x="30" y="12" width="4" height="36" rx="1" fill="#B0BEC5" stroke="#2D3436" strokeWidth="1.8" />
      {/* Balance beam */}
      <rect x="8" y="10" width="48" height="4" rx="2" fill="#F1C40F" stroke="#2D3436" strokeWidth="1.8" />
      {/* Top ornament */}
      <circle cx="32" cy="8" r="3" fill="#F1C40F" stroke="#2D3436" strokeWidth="1.5" />
      {/* Left chain */}
      <line x1="14" y1="14" x2="14" y2="26" stroke="#2D3436" strokeWidth="1.5" strokeDasharray="2 2" />
      {/* Left pan */}
      <path d="M6 26H22" stroke="#2D3436" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6 26C6 26 6 34 14 34C22 34 22 26 22 26" fill="#3498DB" stroke="#2D3436" strokeWidth="1.8" strokeLinejoin="round" />
      {/* Right chain */}
      <line x1="50" y1="14" x2="50" y2="22" stroke="#2D3436" strokeWidth="1.5" strokeDasharray="2 2" />
      {/* Right pan */}
      <path d="M42 22H58" stroke="#2D3436" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M42 22C42 22 42 30 50 30C58 30 58 22 58 22" fill="#E74C3C" stroke="#2D3436" strokeWidth="1.8" strokeLinejoin="round" />
      {/* Base */}
      <rect x="20" y="48" width="24" height="5" rx="2" fill="#8D6E63" stroke="#2D3436" strokeWidth="1.8" />
      <rect x="24" y="53" width="16" height="3" rx="1" fill="#795548" stroke="#2D3436" strokeWidth="1.2" />
      {/* Book */}
      <rect x="4" y="44" width="12" height="8" rx="1" fill="#3498DB" stroke="#2D3436" strokeWidth="1.5" />
      <line x1="10" y1="44" x2="10" y2="52" stroke="#2D3436" strokeWidth="1" />
      <line x1="6" y1="47" x2="14" y2="47" stroke="#2D3436" strokeWidth="0.8" />
      {/* Gavel */}
      <rect x="48" y="40" width="12" height="5" rx="1.5" fill="#8D6E63" stroke="#2D3436" strokeWidth="1.5" />
      <rect x="52" y="36" width="4" height="14" rx="1" fill="#A1887F" stroke="#2D3436" strokeWidth="1.2" />
    </svg>
  );
}

// ─── Icon Map ───
const categoryIconMap: Record<string, React.FC<IconProps>> = {
  "Electronics": ElectronicsIcon,
  "CCTV & Networking": CCTVIcon,
  "Furniture": FurnitureIcon,
  "Construction": ConstructionIcon,
  "Fabrication": FabricationIcon,
  "Technology": TechnologyIcon,
  "Education": EducationIcon,
  "Finance": FinanceIcon,
  "Real Estate": RealEstateIcon,
  "Restaurants": RestaurantsIcon,
  "Beauty Spa": BeautySpaIcon,
  "Home Decor": HomeDecorIcon,
  "Wedding": WeddingIcon,
  "Rent & Hire": RentHireIcon,
  "Hotels": HotelsIcon,
  "Automotive": AutomotiveIcon,
  "Health & Wellness": HealthIcon,
  "Events": EventsIcon,
  "Entertainment": EntertainmentIcon,
  "Legal": LegalIcon,
};

export function CategoryIcon({ name, size = 40, className }: { name: string; size?: number; className?: string }) {
  const IconComponent = categoryIconMap[name];
  if (!IconComponent) {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
        <circle cx="32" cy="32" r="20" fill="#3498DB" stroke="#2D3436" strokeWidth="1.8" />
        <circle cx="32" cy="32" r="8" fill="#E8F4FD" stroke="#2D3436" strokeWidth="1.5" />
        <circle cx="32" cy="32" r="3" fill="#2D3436" />
      </svg>
    );
  }
  return <IconComponent size={size} className={className} />;
}

export default CategoryIcon;
