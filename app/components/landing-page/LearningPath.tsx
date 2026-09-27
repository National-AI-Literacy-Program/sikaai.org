import styles from "./landing-page.module.css";

const steps = [
  ["01", "◉", "Recognise AI", "Notice the AI already present in the apps, platforms, and services you use."],
  ["02", "⌘", "Understand AI", "Learn how AI works, how it learns, and why it can sometimes get things wrong."],
  ["03", "✦", "Create with AI", "Explore how AI-generated content is made and how to question what you see."],
  ["04", "◌", "Manage AI", "Protect your privacy and make thoughtful, responsible choices online."],
];

export default function LearningPath() {
  return (
    <div className={styles.pathGrid}>
      {steps.map(([number, icon, title, description]) => (
        <article className={styles.pathItem} key={number}>
          <span className={styles.pathNumber}><span aria-hidden="true">{icon}</span><small>{number}</small></span>
          <h3>{title}</h3>
          <p>{description}</p>
          <span className={styles.pathArrow} aria-hidden="true">↗</span>
        </article>
      ))}
    </div>
  );
}