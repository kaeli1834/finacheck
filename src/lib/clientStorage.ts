"use client";

import { canUseCookies } from "./cookies";

export interface FormState {
  [key: string]: unknown;
}

const STORAGE_KEY = "finacheck-form-data";

export function saveFormData(data: FormState): void {
  if (typeof window === "undefined") return;
  
  try {
    if (canUseCookies()) {
      // Si cookies acceptés, on peut utiliser sessionStorage
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } else {
      // Mode sans cookie : stockage en mémoire seulement
      // Les données seront perdues à la fermeture de l'onglet
      (window as any)._finacheckFormData = data;
    }
  } catch (error) {
    console.warn("Impossible de sauvegarder les données:", error);
  }
}

export function loadFormData(): FormState | null {
  if (typeof window === "undefined") return null;
  
  try {
    if (canUseCookies()) {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } else {
      // Mode sans cookie : récupération depuis la mémoire
      return (window as any)._finacheckFormData || null;
    }
  } catch (error) {
    console.warn("Impossible de charger les données:", error);
    return null;
  }
}

export function clearFormData(): void {
  if (typeof window === "undefined") return;
  
  try {
    sessionStorage.removeItem(STORAGE_KEY);
    delete (window as any)._finacheckFormData;
  } catch (error) {
    console.warn("Impossible de nettoyer les données:", error);
  }
}

export function getStorageMode(): "cookie" | "session" | "memory" | "none" {
  if (typeof window === "undefined") return "none";
  
  if (canUseCookies()) {
    return "session"; // sessionStorage + cookies pour l'API
  } else {
    return "memory"; // Mémoire volatile seulement
  }
}