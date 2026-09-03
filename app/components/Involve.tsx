"use client";

import { useState } from "react";
import EmailGate from "./EmailGate";

export default function Involve() {
  const [language, setLanguage] = useState<"en" | "ne">("en");
  const nepali = language === "ne";
  const chooseLanguage = (value: "en" | "ne") => {
    setLanguage(value);
    document.cookie = `sikai-language=${value}; path=/; max-age=31536000; SameSite=Lax`;
    window.dispatchEvent(new CustomEvent("sikai-language-change", { detail: value }));
  };

  return (
    <main className={`involve-page ${nepali ? "nepali" : ""}`} lang={nepali ? "ne" : "en"}>
      <div className="involve-frame">
        <div className="involve-intro">
          <p className="eyebrow">{nepali ? "तपाईंको सिकाइ यात्रा" : "YOUR SIKAI JOURNEY"}</p>
          <h1>{nepali ? "जिज्ञासुबाट सक्षमसम्म।" : "From curious to capable."}</h1>
          <p className="involve-lede">{nepali ? "सरल भाषामा AI बुझ्नुहोस्, आफ्नो गतिमा।" : "Understand AI in simple language, at your own pace."}</p>
        </div>
        <div className="language-choice" role="group" aria-label="Choose course language">
          <p className="eyebrow">{nepali ? "भाषा" : "CHOOSE LANGUAGE"}</p>
          <button type="button" className={language === "en" ? "selected" : ""} onClick={() => chooseLanguage("en")}>English</button>
          <button type="button" className={language === "ne" ? "selected" : ""} onClick={() => chooseLanguage("ne")}>नेपाली</button>
        </div>
        <div className="involve-steps">
          <div><b>01</b><span>{nepali ? "बुझ्नुहोस्" : "Understand"}</span></div>
          <div><b>02</b><span>{nepali ? "प्रश्न गर्नुहोस्" : "Question"}</span></div>
          <div><b>03</b><span>{nepali ? "सिर्जना गर्नुहोस्" : "Create"}</span></div>
        </div>
        <section className="involve-start">
          <p className="eyebrow">{nepali ? "सुरु गरौं" : "START HERE"}</p>
          <h2>{nepali ? "पहिलो पाठ तपाईंको लागि तयार छ।" : "Your first lesson is ready."}</h2>
          <p>{nepali ? "इमेल दिनुहोस् र हामी तपाईंलाई पाठ्यक्रममा लैजानेछौं।" : "Share your email and we’ll take you straight to the course."}</p>
          <EmailGate />
          <small>{nepali ? "पासवर्ड आवश्यक छैन।" : "No password needed."}</small>
        </section>
      </div>
    </main>
  );
}
