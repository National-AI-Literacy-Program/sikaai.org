'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { Download } from 'lucide-react';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

declare global {
  interface Window {
    __installPrompt?: BeforeInstallPromptEvent | null;
  }
}

const PROMPT_CHANGED = 'installpromptchange';
const FLOW_KEY = 'sikaai-install-flow'; // 'pending' | 'done', per browser tab

function subscribePrompt(callback: () => void) {
  window.addEventListener(PROMPT_CHANGED, callback);
  return () => window.removeEventListener(PROMPT_CHANGED, callback);
}
const getPrompt = () => window.__installPrompt ?? null;
const getServerPrompt = () => null;

const subscribeNoop = () => () => {};

function subscribeStandalone(callback: () => void) {
  const mq = window.matchMedia('(display-mode: standalone)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getIsStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as any).standalone === true
  );
}

function getIsIOS() {
  const ua = navigator.userAgent;
  return (
    /iphone|ipad|ipod/i.test(ua) ||
    (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1)
  );
}

// True when the visitor arrived from sikaai.org via learn.sikaai.org/?install=1.
// The flag is remembered for the tab, so it survives a redirect that drops the
// query string (e.g. /involve?install=1 -> /course for registered users).
function getWantsInstall() {
  const hasParam =
    new URLSearchParams(window.location.search).get('install') === '1';
  try {
    if (hasParam) sessionStorage.setItem(FLOW_KEY, 'pending');
    return sessionStorage.getItem(FLOW_KEY) === 'pending';
  } catch {
    return hasParam; // storage blocked: fall back to the URL only
  }
}

// Stops the modal from coming back on later page loads in this tab
function markDone() {
  try {
    sessionStorage.setItem(FLOW_KEY, 'done');
  } catch {}
}

// Only the learn. subdomain is the app (covers learn.sikaai.org and learn.localhost)
function getIsLearnHost() {
  return window.location.hostname.startsWith('learn.');
}

const getServerSnapshot = () => false;

function setPrompt(value: BeforeInstallPromptEvent | null) {
  window.__installPrompt = value;
  window.dispatchEvent(new Event(PROMPT_CHANGED));
}

export default function InstallButton({
  className = 'rounded-xl bg-red-900 px-4 py-3 font-bold text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50',
}: {
  className?: string;
}) {
  const [justInstalled, setJustInstalled] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const deferred = useSyncExternalStore(subscribePrompt, getPrompt, getServerPrompt);
  const isStandalone = useSyncExternalStore(
    subscribeStandalone,
    getIsStandalone,
    getServerSnapshot
  );
  const isIOS = useSyncExternalStore(subscribeNoop, getIsIOS, getServerSnapshot);
  const wantsInstall = useSyncExternalStore(
    subscribeNoop,
    getWantsInstall,
    getServerSnapshot
  );
  const isLearnHost = useSyncExternalStore(
    subscribeNoop,
    getIsLearnHost,
    getServerSnapshot
  );

  const installed = isStandalone || justInstalled;

  const dismiss = () => {
    markDone();
    setDismissed(true);
  };

  useEffect(() => {
    // Backup in case the layout script is missing. Does nothing harmful if both run.
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      markDone();
      setJustInstalled(true);
      setPrompt(null);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        markDone();
        setDismissed(true);
      }
    };

    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  // Runs from a real tap, which is what the browser requires to show its install popup
  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setPrompt(null); // the event can only be used once
    dismiss();
  };

  // Invisible unless the visitor is on learn. and came from the "Install" button on sikaai.org
  if (!isLearnHost || !wantsInstall || installed || dismissed) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="install-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
    >
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-neutral-900 shadow-xl">
        <h2 id="install-title" className="text-lg font-semibold">
          Install SikaAI
        </h2>
        <p className="mt-2 text-sm text-neutral-600">
          Add SikaAI to your device so it opens like any other app.
        </p>

        {isIOS ? (
          <p className="mt-5 text-sm">
            Tap the Share icon, then choose “Add to Home Screen”.
          </p>
        ) : (
          <>
            <button
              onClick={install}
              disabled={!deferred}
              autoFocus
              className={`mt-5 inline-flex w-full items-center justify-center gap-2 outline-none ${className}`}
            >
              <Download size={18} aria-hidden="true" />
              Install SikaAI
            </button>
            {!deferred && (
              <p className="mt-3 text-xs text-neutral-500">
                If this stays disabled, <strong> reload the page </strong>  or open your
                browser menu and choose “Install app”.
              </p>
            )}
          </>
        )}

        <button
          onClick={dismiss}
          className="mt-3 w-full text-sm text-neutral-500"
        >
          Not now
        </button>
      </div>
    </div>
  );
}