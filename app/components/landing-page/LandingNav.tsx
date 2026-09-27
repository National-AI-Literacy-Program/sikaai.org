import Link from "next/link";
import LanguageToggle from "./LanguageToggle";
import styles from "./landing-page.module.css";

type LandingNavProps = {
  nepali: boolean;
  onLanguageChange: () => void;
};

export default function LandingNav({ nepali, onLanguageChange }: LandingNavProps) {
  return (
    <header className={styles.nav}>
      <Link href="/" className={styles.logo} aria-label="SikaiAI home">
        नेपाल<span>AI</span>
      </Link>
      <nav className={styles.navLinks} aria-label="Main navigation">
        <a href="#method">{nepali ? "हाम्रो विधि" : "Our method"}</a>
        <a href="#journey">{nepali ? "चार हप्ते यात्रा" : "Four-week journey"}</a>
        <a href="#references">{nepali ? "सन्दर्भ" : "References"}</a>
        <Link href="/course" className={styles.navButton}>{nepali ? "पाठ्यक्रम सुरु गर्नुहोस्" : "Start learning"}</Link>
        <LanguageToggle nepali={nepali} onChange={onLanguageChange} />
      </nav>
    </header>
  );
}