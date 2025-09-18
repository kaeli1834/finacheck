"use client";

import { useState, useEffect } from "react";
import { getCookieConsent, type CookieConsent } from "@/lib/cookies";

// Événement personnalisé pour notifier les changements de consentement
const CONSENT_CHANGE_EVENT = "cookieConsentChange";

export function dispatchCookieConsentChange(consent: CookieConsent) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(CONSENT_CHANGE_EVENT, { detail: consent })
    );
  }
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent>(null);

  useEffect(() => {
    // Initialiser avec la valeur actuelle
    setConsent(getCookieConsent());

    // Écouter les changements
    const handleConsentChange = (event: CustomEvent<CookieConsent>) => {
      setConsent(event.detail);
    };

    window.addEventListener(CONSENT_CHANGE_EVENT, handleConsentChange as EventListener);

    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, handleConsentChange as EventListener);
    };
  }, []);

  return consent;
}