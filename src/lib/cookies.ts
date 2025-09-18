"use client";

export type CookieConsent = "accepted" | "declined" | null;

export function getCookieConsent(): CookieConsent {
  if (typeof window === "undefined") return null;
  
  const consent = localStorage.getItem("cookie-consent");
  if (consent === "accepted" || consent === "declined") {
    return consent as CookieConsent;
  }
  return null;
}

export function setCookieConsent(consent: CookieConsent) {
  if (typeof window === "undefined") return;
  
  if (consent) {
    localStorage.setItem("cookie-consent", consent);
  } else {
    localStorage.removeItem("cookie-consent");
  }
}

export function hasCookieConsent(): boolean {
  return getCookieConsent() !== null;
}

export function canUseCookies(): boolean {
  return getCookieConsent() === "accepted";
}