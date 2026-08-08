"use client";

import React from "react";

const minangQuotes = [
  "Alam takambang jadi guru",
  "Bulek aia dek pambuluah, bulek kato dek mufakat",
  "Sakali aia gadang, sakali tapian baranjak",
  "Nan kuriak kundi, nan merah sago, nan baik budi, nan indah bahaso",
  "Duduak samo randah, tagak samo tinggi",
  "Lamak dek awak, katuju dek urang",
  "Adat basandi syarak, syarak basandi kitabullah",
  "Tahu di nan ampek, paham di nan salapan",
];

export default function MinangQuote() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false);

      // Change quote after fade out
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % minangQuotes.length);
        setIsVisible(true);
      }, 500); // Wait for fade out animation
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 w-full max-w-xs lg:max-w-sm xl:max-w-md overflow-hidden">
      <span className="text-xl flex-shrink-0">💬</span>
      <p
        className={`text-xs lg:text-sm italic text-default-600 transition-opacity duration-500 truncate ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        title={minangQuotes[currentIndex]}
      >
        &quot;{minangQuotes[currentIndex]}&quot;
      </p>
    </div>
  );
}
