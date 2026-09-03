import Link from "next/link";
import CertificateRequestForm from "@/app/components/CertificateRequestForm";

export default function CertificatePage() {
  return <main className="certificate-page"><nav className="site-nav shell"><Link className="brand" href="/">Sikaai<span>AI</span></Link><Link className="back-link" href="/course">← Course overview</Link></nav><section className="certificate-shell"><p className="eyebrow">YOU MADE IT</p><h1>Your learning,<br /><span>worth keeping.</span></h1><p className="certificate-intro">Request your SikaiAI certificate of completion. Add your details below and we&apos;ll review your course progress before sending it.</p><CertificateRequestForm /></section></main>;
}
