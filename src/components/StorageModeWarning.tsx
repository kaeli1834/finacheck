"use client";

import { useEffect, useState } from "react";
import { getStorageMode } from "@/lib/clientStorage";
import { useCookieConsent } from "@/hooks/useCookieConsent";

export default function StorageModeWarning() {
  const [storageMode, setStorageMode] = useState<string | null>(null);
  const cookieConsent = useCookieConsent();

  useEffect(() => {
    setStorageMode(getStorageMode());
  }, []);

  // Mettre à jour le mode de stockage quand le consentement change
  useEffect(() => {
    if (cookieConsent !== null) {
      setStorageMode(getStorageMode());
    }
  }, [cookieConsent]);

  if (!storageMode || storageMode === "session") return null;

  return (
    <div className="mb-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
      <div className="flex items-start gap-2">
        <div className="flex-shrink-0 mt-0.5">
          <div className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center">
            <span className="text-amber-600 dark:text-amber-400 text-xs">⚠️</span>
          </div>
        </div>
        <div>
          <h4 className="font-medium text-sm text-amber-900 dark:text-amber-100 mb-1">
            Mode sans cookie activé
          </h4>
          <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
            {storageMode === "memory" ? (
              <>
                Vos données seront perdues si vous fermez cet onglet ou rafraîchissez la page. 
                Nous vous recommandons de compléter le formulaire en une fois.
              </>
            ) : (
              "Stockage temporaire désactivé. Vos données ne seront pas sauvegardées."
            )}
          </p>
        </div>
      </div>
    </div>
  );
}