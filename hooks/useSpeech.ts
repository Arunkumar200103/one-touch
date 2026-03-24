"use client";

import { useState, useCallback, useRef } from "react";

// ---------------------------------------------------------------------------
// Tamil preprocessing — adds natural pauses & removes unsupported characters
// ---------------------------------------------------------------------------
function preprocessTamil(text: string): string {
  return text
    .replace(/([.,?!;:।])/g, "$1 ")        // breath pause after punctuation
    .replace(/ா{2,}/g, "ா")               // collapse duplicate vowel marks
    .replace(/ி{2,}/g, "ி")
    .replace(/ு{2,}/g, "ு")
    .replace(/ூ{2,}/g, "ூ")
    .replace(/[^\u0B80-\u0BFF\s.,?!;:a-zA-Z0-9]/g, "") // keep Tamil + latin
    .replace(/\s{2,}/g, " ")
    .trim();
}

// ---------------------------------------------------------------------------
// Transliteration fallback — used when NO Tamil TTS voice exists on the device
// Produces romanised text that a generic English female voice can read cleanly
// ---------------------------------------------------------------------------
const TAMIL_TO_ROMAN: [RegExp, string][] = [

  // ── 1. VOWEL SIGNS (matras) — MUST come before consonants ──────────────
  // Replacing these first prevents "kaaa" artefacts from consonant+matra combos
  [/ா/g,  "aa"],
  [/ி/g,  "i"],
  [/ீ/g,  "ii"],   // was "ee" — "ii" is longer, matches Tamil ஈ length
  [/ு/g,  "u"],
  [/ூ/g,  "uu"],   // was "oo" — "uu" correctly signals long u
  [/ெ/g,  "e"],
  [/ே/g,  "ee"],   // was "ae" — "ee" is what TTS engines pronounce correctly
  [/ை/g,  "ai"],
  [/ொ/g,  "o"],
  [/ோ/g,  "oo"],   // was "oh" — "oo" signals long o to TTS
  [/ௌ/g,  "au"],
  [/்/g,  ""],      // pulli — kills the inherent vowel, no sound

  // ── 2. INDEPENDENT VOWELS ───────────────────────────────────────────────
  [/அ/g,  "a"],
  [/ஆ/g,  "aa"],
  [/இ/g,  "i"],
  [/ஈ/g,  "ii"],
  [/உ/g,  "u"],
  [/ஊ/g,  "uu"],
  [/எ/g,  "e"],
  [/ஏ/g,  "ee"],
  [/ஐ/g,  "ai"],
  [/ஒ/g,  "o"],
  [/ஓ/g,  "oo"],
  [/ஔ/g,  "au"],

  // ── 3. CONSONANTS (மெய் எழுத்துக்கள்) ─────────────────────────────────
  [/க/g,  "ka"],
  [/ங/g,  "nga"],
  [/ச/g,  "cha"],  // was "sa" — "cha" sounds more natural for TTS
  [/ஞ/g,  "nya"],
  [/ட/g,  "da"],
  [/ண/g,  "na"],
  [/த/g,  "tha"],
  [/ந/g,  "na"],
  [/ப/g,  "pa"],
  [/ம/g,  "ma"],
  [/ய/g,  "ya"],
  [/ர/g,  "ra"],
  [/ல/g,  "la"],
  [/வ/g,  "va"],
  [/ழ/g,  "zha"],
  [/ள/g,  "lla"],  // was "la" — "lla" distinguishes retroflex ள from dental ல
  [/ற/g,  "rra"],  // was "ra" — "rra" correctly trills; distinguishes from ர
  [/ன/g,  "na"],

  // ── 4. GRANTHA (Sanskrit loans) ─────────────────────────────────────────
  [/ஜ/g,  "ja"],
  [/ஷ/g,  "sha"],
  [/ஸ/g,  "sa"],
  [/ஹ/g,  "ha"],
  [/ஶ/g,  "sha"],  // rare palatal sh

  // ── 5. SPECIAL CHARACTERS ───────────────────────────────────────────────
  [/ஃ/g,  "h"],    // aytham — breath sound (was "ak" which is wrong)
  [/ஂ/g,  "m"],    // anusvara

  // ── 6. TAMIL DIGITS → ASCII ─────────────────────────────────────────────
  [/௦/g,  "0"],
  [/௧/g,  "1"],
  [/௨/g,  "2"],
  [/௩/g,  "3"],
  [/௪/g,  "4"],
  [/௫/g,  "5"],
  [/௬/g,  "6"],
  [/௭/g,  "7"],
  [/௮/g,  "8"],
  [/௯/g,  "9"],
  [/௰/g,  "10"],
  [/௱/g,  "100"],
  [/௲/g,  "1000"],

  // ── 7. PUNCTUATION / SYMBOLS ────────────────────────────────────────────
  [/[।॥]/g, ". "],  // danda marks → sentence pause
  [/[௳-௺]/g, ""],   // day/month/year/currency symbols → strip
];

function tamilToRoman(text: string): string {
  let out = text;
  for (const [pattern, replacement] of TAMIL_TO_ROMAN) {
    out = out.replace(pattern, replacement);
  }
  return out;
}

// ---------------------------------------------------------------------------
// Voice picker — returns the best available FEMALE voice for the given lang
// ---------------------------------------------------------------------------
function pickFemaleVoice(
  bcp47: string,
  voices: SpeechSynthesisVoice[]
): SpeechSynthesisVoice | undefined {
  if (bcp47 === "ta-IN") {
    // Step 1 — collect all Tamil voices
    const tamilVoices = voices.filter((v) =>
      /^ta(\b|-)/i.test(v.lang)
    );

    if (tamilVoices.length === 0) return undefined; // caller will use fallback

    // Step 2 — strict female filter (exclude known male names / keywords)
    const MALE_KEYWORDS = /\b(male|man|guy|valluvar|linga|murugan|arasan)\b/i;
    const femaleVoices = tamilVoices.filter(
      (v) => !MALE_KEYWORDS.test(v.name)
    );

    const pool = femaleVoices.length > 0 ? femaleVoices : tamilVoices;

    // Step 3 — priority ranking
    const FEMALE_PRIORITY = [
      /google.*tamil/i,          // Android Chrome — best quality
      /microsoft.*latha/i,       // Windows — popular Tamil female
      /microsoft.*vijaya/i,      // Windows alternate
      /female/i,                 // generic label
      /ta-in/i,                  // locale match
    ];

    for (const pattern of FEMALE_PRIORITY) {
      const match = pool.find((v) => pattern.test(v.name));
      if (match) return match;
    }

    return pool[0]; // best available Tamil female (or any Tamil if all are ambiguous)
  }

  // English — prefer natural female voices
  const enVoices = voices.filter((v) => v.lang.startsWith("en"));
  const ENGLISH_FEMALE_PRIORITY = [
    /samantha/i, /karen/i, /victoria/i, /moira/i, /tessa/i,
    /fiona/i,    /veena/i, /female/i,   /zira/i,  /hazel/i,
  ];

  for (const pattern of ENGLISH_FEMALE_PRIORITY) {
    const match = enVoices.find((v) => pattern.test(v.name));
    if (match) return match;
  }

  return enVoices[0];
}

// ---------------------------------------------------------------------------
// Main hook
// ---------------------------------------------------------------------------
export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string, lang = "en") => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    // Strip emojis and tidy whitespace
    let cleanText =
      typeof text === "string"
        ? text
            .replace(/[\u{1F000}-\u{1FFFF}]/gu, "")
            .replace(/[\u2600-\u27BF]/gu, "")
            .replace(/\s+/g, " ")
            .trim()
        : "";

    if (!cleanText) return;

    const bcp47 = lang === "ta" ? "ta-IN" : "en-US";

    // ------------------------------------------------------------------
    // Build utterance — decide whether to use native Tamil or transliteration
    // ------------------------------------------------------------------
    const buildAndSpeak = () => {
      const voices = window.speechSynthesis.getVoices();
      const tamilVoiceAvailable =
        bcp47 === "ta-IN" &&
        voices.some((v) => /^ta(\b|-)/i.test(v.lang));

      let finalText = cleanText;
      let finalLang = bcp47;

      if (bcp47 === "ta-IN") {
        if (tamilVoiceAvailable) {
          // Use native Tamil with light preprocessing
          finalText = preprocessTamil(cleanText);
        } else {
          // Fallback: romanise for English TTS — still female, still intelligible
          finalText = tamilToRoman(cleanText);
          finalLang = "en-IN"; // Indian English accent sounds closer to Tamil
        }
      }

      const utterance = new SpeechSynthesisUtterance(finalText);
      utterance.lang = finalLang;

      // Tune for gender + clarity
      if (bcp47 === "ta-IN" && tamilVoiceAvailable) {
        utterance.rate   = 0.65;  // slower → clearer Tamil syllables
        utterance.pitch  = 1.25;  // higher pitch → female naturalness
        utterance.volume = 1.0;
      } else if (bcp47 === "ta-IN") {
        // Romanised fallback via English voice
        utterance.rate   = 0.80;
        utterance.pitch  = 1.2;
        utterance.volume = 1.0;
      } else {
        utterance.rate   = 0.90;
        utterance.pitch  = 1.1;
        utterance.volume = 1.0;
      }

      // Assign best female voice
      const selectedVoice = pickFemaleVoice(finalLang, voices);
      if (selectedVoice) utterance.voice = selectedVoice;

      utterance.onstart    = () => setIsSpeaking(true);
      utterance.onend      = () => setIsSpeaking(false);
      utterance.onerror    = () => setIsSpeaking(false);
      // Keep isSpeaking = true between word boundaries (prevents flicker)
      utterance.onboundary = () => setIsSpeaking(true);

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    };

    // Voices may not be loaded yet on first call
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.onvoiceschanged = null; // run only once
        buildAndSpeak();
      };
    } else {
      buildAndSpeak();
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return { speak, stop, isSpeaking };
}