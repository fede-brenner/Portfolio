import { setOptions, importLibrary } from '@googlemaps/js-api-loader'

const apiKey = process.env.VUE_APP_GOOGLE_MAPS_API_KEY

export const isGoogleMapsConfigured = !!apiKey

if (!isGoogleMapsConfigured) {
  console.warn(
    'Falta VUE_APP_GOOGLE_MAPS_API_KEY. Configurala en .env.local para poder buscar barrios con Google Places.'
  )
} else {
  setOptions({ key: apiKey, v: 'weekly' })
}

let placesLibraryPromise = null

export function loadPlacesLibrary() {
  if (!isGoogleMapsConfigured) {
    return Promise.reject(new Error('Google Maps no está configurado (falta VUE_APP_GOOGLE_MAPS_API_KEY).'))
  }
  if (!placesLibraryPromise) {
    placesLibraryPromise = importLibrary('places')
  }
  return placesLibraryPromise
}

let mapsLibraryPromise = null

// Requiere que 'Maps JavaScript API' esté habilitada en el mismo proyecto de
// Google Cloud que Places (es una API separada, con su propio conteo de uso).
export function loadMapsLibrary() {
  if (!isGoogleMapsConfigured) {
    return Promise.reject(new Error('Google Maps no está configurado (falta VUE_APP_GOOGLE_MAPS_API_KEY).'))
  }
  if (!mapsLibraryPromise) {
    mapsLibraryPromise = importLibrary('maps')
  }
  return mapsLibraryPromise
}
