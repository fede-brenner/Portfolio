import { feature } from 'topojson-client'
import iso from 'iso-3166-1'
// Resolución baja (110m): ahora estos polígonos solo se usan como overlay de
// color sobre el mapa real de Google (tiles), no como el mapa en sí, así que
// no hace falta precisión de costas — el detalle real lo da Google Maps.
import worldTopo from 'world-atlas/countries-110m.json'
import { PAIS_FLAG_CODES } from '@/config/personaOptions'

let countryFeaturesCache = null

export function getCountryFeatures() {
  if (!countryFeaturesCache) {
    countryFeaturesCache = feature(worldTopo, worldTopo.objects.countries).features
  }
  return countryFeaturesCache
}

const numericIdByPais = {}
Object.entries(PAIS_FLAG_CODES).forEach(([nombre, alpha2]) => {
  const info = iso.whereAlpha2(alpha2)
  if (info) numericIdByPais[nombre] = String(info.numeric).padStart(3, '0')
})

export function findCountryFeature(paisNombre) {
  const numericId = numericIdByPais[paisNombre]
  if (!numericId) return null
  return getCountryFeatures().find((f) => f.id === numericId) || null
}
