import { reactive } from 'vue'

const STORAGE_KEY = 'panel:lang'

export const LANGUAGES = ['en', 'de', 'es']

// Nombres nativos mostrados en el menú desplegable de idioma (en vez de las
// siglas EN/DE/ES).
export const LANGUAGE_LABELS = {
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
}

function readInitial() {
  const stored = localStorage.getItem(STORAGE_KEY)
  return LANGUAGES.includes(stored) ? stored : 'en'
}

export const languageState = reactive({ value: readInitial() })

export function setLanguage(value) {
  languageState.value = value
  localStorage.setItem(STORAGE_KEY, value)
}

export function cycleLanguage() {
  const currentIndex = LANGUAGES.indexOf(languageState.value)
  setLanguage(LANGUAGES[(currentIndex + 1) % LANGUAGES.length])
}
