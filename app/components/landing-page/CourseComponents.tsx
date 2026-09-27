import styles from "./landing-page.module.css";

const components = [
  ["01", "▤", "Learn", "Build a clear foundation with short lessons and familiar examples."],
  ["02", "↗", "Track it", "Keep your place across four weeks and see what you have completed."],
  ["03", "✓", "Test yourself", "Use quick MCQs to check your understanding and strengthen what you learned."],
];

export default function CourseComponents() {
  return (
    <div className={styles.componentGrid}>
      {components.map(([number, icon, title, description]) => (
        <article className={styles.componentCard} key={number}>
          <div className={styles.componentIcon} aria-hidden="true">{icon}</div>
          <span className={styles.componentNumber}>{number}</span>
          <h3>{title}</h3>
          <p>{description}</p>
        </article>
      ))}
    </div>
  );
}
