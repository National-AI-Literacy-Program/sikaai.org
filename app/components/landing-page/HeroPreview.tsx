import Image from "next/image";
import styles from "./landing-page.module.css";

export default function HeroPreview() {
  return (
    <div className={styles.previewWrap} aria-label="Preview of a SikaiAI lesson">
      <div className={styles.previewStamp}>FIELD NOTE / 01</div>
      <div className={styles.previewCard}>
        <div className={styles.previewMeta}><span>01 — THE BASICS</span><span>2.5 MIN READ</span></div>
        <div className={styles.previewArt}>
          <Image src="/lesson-art/namaste.svg" alt="Illustration welcoming learners" width={106} height={106} />
          <span>hello,<br />AI.</span>
        </div>
        <p className={styles.previewKicker}>EVERYDAY AI / LESSON ONE</p>
        <h2>What is AI,<br /><em>really?</em></h2>
        <p className={styles.previewDescription}>A friendly starting point for noticing the technology already shaping your day.</p>
        <div className={styles.previewFooter}><span>Read the lesson</span><span aria-hidden="true">→</span></div>
      </div>
      <div className={styles.previewNote}><span className={styles.noteLine} />Built for curious humans</div>
    </div>
  );
}