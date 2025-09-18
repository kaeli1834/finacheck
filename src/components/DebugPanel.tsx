"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  loadFormData,
  clearFormData,
  getStorageMode,
} from "@/lib/clientStorage";
import { canUseCookies, getCookieConsent } from "@/lib/cookies";

export default function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const methods = useFormContext();

  if (process.env.NODE_ENV !== "development") return null;

  const currentData = methods?.watch() || {};
  const storedData = loadFormData();

  const clearAll = () => {
    // Effacer toutes les données
    clearFormData();
    localStorage.clear();
    sessionStorage.clear();

    // Effacer les cookies
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });

    console.log("🧹 Toutes les données effacées");
    window.location.reload();
  };

  const clearStorage = () => {
    clearFormData();
    localStorage.removeItem("cookie-consent");
    console.log("💾 Storage effacé");
    window.location.reload();
  };

  const resetForm = () => {
    methods?.reset();
    clearFormData();
    console.log("📝 Formulaire réinitialisé");
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 rounded-lg text-xs font-medium shadow-sm transition-colors"
        title="Ouvrir le panel de debug"
      >
        🐛 Debug
      </button>
    );
  }

  return (
    <div className="fixed top-16 right-4 bg-slate-900 text-white rounded-lg shadow-2xl z-50 w-80 max-h-96 overflow-auto">
      <div className="flex items-center justify-between p-3 border-b border-slate-700">
        <h4 className="font-bold text-sm">🐛 Debug Panel</h4>
        <button
          onClick={() => setIsOpen(false)}
          className="text-slate-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="p-3 space-y-3">
        {/* État actuel */}
        <div className="space-y-2">
          <div className="text-xs">
            <strong>🍪 Cookies:</strong>{" "}
            {canUseCookies() ? "✅ Acceptés" : "❌ Refusés"}
          </div>
          <div className="text-xs">
            <strong>🗳️ Consentement:</strong>{" "}
            {getCookieConsent() || "Non défini"}
          </div>
          <div className="text-xs">
            <strong>💾 Mode:</strong> {getStorageMode()}
          </div>
          <div className="text-xs">
            <strong>📊 Champs remplis:</strong>{" "}
            {
              Object.keys(currentData).filter(
                (k) => currentData[k] !== undefined && currentData[k] !== ""
              ).length
            }
          </div>
        </div>

        {/* Actions rapides */}
        <div className="space-y-2">
          <button
            onClick={resetForm}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs transition-colors"
          >
            📝 Reset Form
          </button>
          <button
            onClick={clearStorage}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded text-xs transition-colors"
          >
            💾 Clear Storage
          </button>
          <button
            onClick={clearAll}
            className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-xs transition-colors"
          >
            🧹 Clear All
          </button>
        </div>

        {/* Données détaillées */}
        <details className="text-xs">
          <summary className="cursor-pointer text-slate-300 hover:text-white">
            📋 Données formulaire
          </summary>
          <pre className="text-xs bg-slate-800 p-2 rounded mt-1 overflow-x-auto">
            {JSON.stringify(currentData, null, 2)}
          </pre>
        </details>

        <details className="text-xs">
          <summary className="cursor-pointer text-slate-300 hover:text-white">
            🗂️ Storage
          </summary>
          <pre className="text-xs bg-slate-800 p-2 rounded mt-1 overflow-x-auto">
            {JSON.stringify(storedData, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
}
