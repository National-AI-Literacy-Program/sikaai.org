import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import RegisterSW from "@/app/components/RegisterSW";
import InstallButton from "@/app/components/pwa/InstallButton"; 

export const metadata: Metadata = {
  title: "SikaAI: AI for All",
  description: "SikaAI is a four-week, offline-ready AI literacy program for Nepali school students (K-12) and learners of all ages.",
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

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: installCapture }} />
      </head>
      <body className="bg-background antialiased">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
        <InstallButton />
        <RegisterSW />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}