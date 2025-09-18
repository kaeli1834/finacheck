"use client";

import { useState, useEffect } from "react";
import { dispatchCookieConsentChange } from "@/hooks/useCookieConsent";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fait un choix
    const hasConsented = localStorage.getItem("cookie-consent");
    if (!hasConsented) {
      setShowBanner(true);
      // Animation d'entrée
      setTimeout(() => setIsVisible(true), 100);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    dispatchCookieConsentChange("accepted");
    handleClose();
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    dispatchCookieConsentChange("declined");
    // TODO: Implémenter la logique pour désactiver les cookies
    handleClose();
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  if (!showBanner) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 shadow-lg">
        <div className="mx-auto max-w-6xl p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900 flex items-center justify-center">
                    <span className="text-violet-600 dark:text-violet-400 text-sm">
                      🍪
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1">
                    Utilisation de cookies techniques
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Nous utilisons un cookie technique pour sauvegarder
                    temporairement vos saisies pendant le calcul. Ce cookie est
                    chiffré, expire après 1h et est supprimé automatiquement
                    après le calcul.
                    <a
                      href="/privacy#cookies"
                      className="text-violet-600 dark:text-violet-400 underline hover:no-underline ml-1"
                    >
                      En savoir plus
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 md:flex-row md:gap-3 md:flex-shrink-0">
              <button
                onClick={handleDecline}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              >
                Refuser
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-2 text-sm font-medium bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
              >
                Accepter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
