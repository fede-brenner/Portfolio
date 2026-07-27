import { reactive } from 'vue'

const STORAGE_KEY = 'panel:theme'

function readInitial() {
  return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark'
}

export const themeState = reactive({ value: readInitial() })

// El atributo va en <html> (no en un div del panel) para que los selectores
// CSS `[data-theme='light'] .algo` matcheen también cuando ese '.algo' está
// en el propio elemento raíz del panel, y no solo en sus descendientes.
export function setTheme(value) {
  themeState.value = value
  localStorage.setItem(STORAGE_KEY, value)
  document.documentElement.setAttribute('data-theme', value)
}

export function toggleTheme() {
  setTheme(themeState.value === 'dark' ? 'light' : 'dark')
}

// Chart.js dibuja en <canvas>, así que sus colores no los puede tocar el CSS
// de tema (no son clases) — cada dashboard arma sus opciones de color en base
// a esto, reactivamente según el tema actual.
export const CHART_COLORS = {
  dark: { text: '#888888', grid: '#2a2b31' },
  light: { text: '#5a5a63', grid: '#d8d8de' }
}

// Aplica el tema guardado apenas se carga el módulo, antes de montar
// cualquier componente, para que no haya parpadeo oscuro→claro al entrar.
document.documentElement.setAttribute('data-theme', themeState.value)
