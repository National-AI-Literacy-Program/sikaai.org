"use client";

import styles from "./landing-page.module.css";

type LanguageToggleProps = {
  nepali: boolean;
  onChange: () => void;
};

export default function LanguageToggle({ nepali, onChange }: LanguageToggleProps) {
  return (
    <button type="button" className={styles.languageToggle} onClick={onChange} aria-label={nepali ? "Switch to English" : "नेपालीमा बदल्नुहोस्"}>
      <span className={!nepali ? styles.isActive : ""}>EN</span>
      <span className={nepali ? styles.isActive : ""}>ने</span>
    </button>
  );
}