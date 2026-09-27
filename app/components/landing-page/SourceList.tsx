import styles from "./landing-page.module.css";

const sources = [
  ["UNESCO", "AI in education and research", "https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research"],
  ["UNICEF", "AI, children, and their rights", "https://www.unicef.org/globalinsight/reports/policy-guidance-ai-children"],
  ["OECD", "Human-centred AI principles", "https://oecd.ai/en/ai-principles"],
  ["UNESCO", "Media and information literacy", "https://www.unesco.org/en/media-information-literacy"],
];

export default function SourceList() {
  return (
    <div className={styles.sourceList}>
      {sources.map(([name, title, url], index) => (
        <a className={styles.sourceRow} href={url} target="_blank" rel="noreferrer" key={name}>
          <span className={styles.sourceIndex}>0{index + 1}</span>
          <span><strong>{name}</strong><small>{title}</small></span>
          <span className={styles.sourceArrow} aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}