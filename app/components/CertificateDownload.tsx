"use client";

export default function CertificateDownload({
  email,
  total,
}: {
  email: string;
  total: number;
}) {
  function download() {
    const name = email.split("@")[0] || "Learner";
    const text = `SIKAAI AI\n\nCertificate of Completion\n\nThis certificate recognizes ${name} for completing the SikaaiAI course and taking meaningful steps toward AI literacy.\n\nLessons completed: ${total}\nDate: ${new Date().toLocaleDateString()}`;
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "Sikaai-ai-certificate.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  }
  return (
    <button type="button" className="button button-primary" onClick={download}>
      Download certificate <span aria-hidden="true">↓</span>
    </button>
  );
}
