"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

interface TTSContextType {
  ttsEnabled: boolean;
  isSpeaking: boolean;
  toggleTTS: () => void;
  speak: (text: string) => void;
  stopSpeech: () => void;
}

const TTSContext = createContext<TTSContextType | undefined>(undefined);

export function TTSProvider({ children }: { children: React.ReactNode }) {
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = useCallback((text: string) => {
    if (!text) return;

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    // Clean HTML tags and extra whitespace
    const cleanText = text
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .replace(/[^\w\s.,!?;:()-]/g, "")
      .trim();

    if (cleanText.length < 2) return;

    console.log("🔊 Speaking:", cleanText.substring(0, 80) + "...");

    const utterance = new SpeechSynthesisUtterance(cleanText);

    utterance.lang = "id-ID";
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
      console.log("▶️ Speech started");
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      console.log("⏹️ Speech ended");
    };

    utterance.onerror = (e) => {
      setIsSpeaking(false);
      console.error("❌ Speech error:", e);
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  const stopSpeech = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    console.log("⏹️ Speech stopped manually");
  }, []);

  const toggleTTS = useCallback(() => {
    const newState = !ttsEnabled;

    setTtsEnabled(newState);

    if (!newState) {
      stopSpeech();
      console.log("❌ TTS Mode: OFF");
    } else {
      console.log("✅ TTS Mode: ON");
      // Announcement when enabled
      setTimeout(() => {
        speak(
          "Mode aksesibilitas aktif. Arahkan kursor ke teks untuk mendengarkan. Tidak perlu menekan tombol apapun.",
        );
      }, 100);
    }
  }, [ttsEnabled, speak, stopSpeech]);

  // Global hover listener
  useEffect(() => {
    if (!ttsEnabled) return;

    let hoverTimeout: NodeJS.Timeout;
    let lastSpokenText = "";
    let lastSpokenTime = 0;

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Clear previous timeout
      clearTimeout(hoverTimeout);

      // Skip interactive form elements
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.classList.contains("no-tts") ||
        target.hasAttribute("data-no-tts")
      ) {
        return;
      }

      // Add slight delay to avoid speaking on quick mouse movements
      hoverTimeout = setTimeout(() => {
        // Get text content based on element type
        let text = "";

        // For buttons and links, get their direct text only
        if (target.tagName === "BUTTON" || target.tagName === "A") {
          // Get only direct text nodes, not nested elements
          let directText = "";

          Array.from(target.childNodes).forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
              directText += node.textContent?.trim() + " ";
            }
          });
          text = directText.trim();

          // If no direct text, try aria-label
          if (!text && target.hasAttribute("aria-label")) {
            text = target.getAttribute("aria-label") || "";
          }
        }
        // For other elements with aria-label, use it first
        else if (target.hasAttribute("aria-label")) {
          text = target.getAttribute("aria-label") || "";
        }
        // For title attribute
        else if (target.hasAttribute("title")) {
          text = target.getAttribute("title") || "";
        }
        // For text-only nodes (pure text without children elements)
        else if (
          target.childNodes.length === 1 &&
          target.childNodes[0].nodeType === Node.TEXT_NODE
        ) {
          text = target.textContent?.trim() || "";
        }
        // For specific semantic elements, get only direct children text
        else if (
          [
            "P",
            "H1",
            "H2",
            "H3",
            "H4",
            "H5",
            "H6",
            "SPAN",
            "LI",
            "TD",
            "TH",
            "LABEL",
          ].includes(target.tagName)
        ) {
          // Check if it has minimal nested structure
          const hasComplexChildren =
            target.querySelectorAll("div, nav, ul, ol").length > 0;

          if (!hasComplexChildren) {
            // Get text but limit to first level
            const clone = target.cloneNode(true) as HTMLElement;

            // Remove nested complex structures
            clone
              .querySelectorAll("button, a, input")
              .forEach((el) => el.remove());
            text = clone.textContent?.trim() || "";
          }
        }

        // Clean and validate text
        text = text.trim();

        // Skip if text is too long (likely container element)
        if (text.length > 300) {
          return;
        }

        // Prevent re-speaking the same text within 2 seconds
        const now = Date.now();

        if (text === lastSpokenText && now - lastSpokenTime < 2000) {
          return;
        }

        if (text && text.length >= 2) {
          console.log(
            "🎯 Hover on:",
            target.tagName,
            "|",
            text.substring(0, 50),
          );
          speak(text);
          lastSpokenText = text;
          lastSpokenTime = now;
        }
      }, 150); // 150ms delay
    };

    const handleMouseLeave = () => {
      clearTimeout(hoverTimeout);
    };

    // Add listeners to all interactive elements
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    return () => {
      clearTimeout(hoverTimeout);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
      stopSpeech();
    };
  }, [ttsEnabled, speak, stopSpeech]);

  // Stop speech when page unloads
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <TTSContext.Provider
      value={{ ttsEnabled, isSpeaking, toggleTTS, speak, stopSpeech }}
    >
      {children}
    </TTSContext.Provider>
  );
}

export function useTTS() {
  const context = useContext(TTSContext);

  if (context === undefined) {
    throw new Error("useTTS must be used within a TTSProvider");
  }

  return context;
}
