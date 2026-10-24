import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import RegisterSW from "@/app/components/RegisterSW";
import InstallButton from "@/app/components/pwa/InstallButton"; 
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Lato, Mukta } from "next/font/google";
import Script from "next/script";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-lato", display: "swap" });
const mukta = Mukta({ subsets: ["devanagari", "latin"], weight: ["400", "600", "800"], variable: "--font-mukta", display: "swap" });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("title"),
    description: t("description"),
    generator: "SikaAI",
    applicationName: "SikaAI",
    appleWebApp: { capable: true, title: "SikaAI", statusBarStyle: "default" },
     icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  };
}

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: "#a32b2b",
  userScalable: true,
};


const installCapture = `
  if (location.hostname.indexOf('learn.') === 0) {
    window.addEventListener('beforeinstallprompt', function (e) {
      e.preventDefault();
      window.__installPrompt = e;
      window.dispatchEvent(new Event('installpromptchange'));
    });
    window.addEventListener('appinstalled', function () {
      window.__installPrompt = null;
      window.dispatchEvent(new Event('installpromptchange'));
    });
  }
`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
const { locale } = await params;
if (!hasLocale(routing.locales, locale)) notFound();
setRequestLocale(locale);
const messages = await getMessages();

  return (
<html lang={locale} className={`${lato.variable} ${mukta.variable}`} suppressHydrationWarning>
  <body className="bg-background antialiased">
    <Script
      id="install-capture"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: installCapture }}
    />
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider>{children}</ThemeProvider>
         <InstallButton />
    </NextIntlClientProvider>
 
    <RegisterSW />
    {process.env.NODE_ENV === "production" && <Analytics />}
  </body>
</html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}


