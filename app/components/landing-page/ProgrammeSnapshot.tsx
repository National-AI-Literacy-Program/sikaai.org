import styles from "./landing-page.module.css";

type ProgrammeSnapshotProps = {
  nepali: boolean;
};

export default function ProgrammeSnapshot({ nepali }: ProgrammeSnapshotProps) {
  const items = nepali
    ? [["०१", "४ हप्ता"], ["०२", "२८ पाठ"], ["०३", "अन्तरक्रियात्मक"]]
    : [["01", "4 weeks"], ["02", "28 lessons"], ["03", "Interactive"]];

  return (
    <div className={styles.snapshot} aria-label={nepali ? "कार्यक्रमको जानकारी" : "Programme information"}>
      {items.map(([number, label]) => (
        <div className={styles.snapshotItem} key={number}>
          <span>{number}</span>
          <strong>{label}</strong>
        </div>
      ))}
    </div>
  );
}
