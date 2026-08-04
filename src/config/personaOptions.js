export const PAIS_OPTIONS = [
  'Albania',
  'Alemania',
  'Andorra',
  'Argentina',
  'Australia',
  'Austria',
  'Bélgica',
  'Bielorrusia',
  'Bosnia y Herzegovina',
  'Brasil',
  'Bulgaria',
  'Canadá',
  'Chile',
  'China',
  'Chipre',
  'Colombia',
  'Corea del Sur',
  'Croacia',
  'Dinamarca',
  'Ecuador',
  'Eslovaquia',
  'Eslovenia',
  'España',
  'Estados Unidos',
  'Estonia',
  'Finlandia',
  'Francia',
  'Grecia',
  'Holanda',
  'Hungría',
  'India',
  'Irlanda',
  'Islandia',
  'Italia',
  'Letonia',
  'Liechtenstein',
  'Lituania',
  'Luxemburgo',
  'Macedonia del Norte',
  'Malta',
  'Mexico',
  'Moldavia',
  'Mónaco',
  'Montenegro',
  'Noruega',
  'Nueva Zelanda',
  'Paraguay',
  'Peru',
  'Polonia',
  'Portugal',
  'Puerto Rico',
  'Reino Unido',
  'República Checa',
  'Rumania',
  'Rusia',
  'San Marino',
  'Serbia',
  'Suecia',
  'Suiza',
  'Turquia',
  'Ucrania',
  'Uruguay',
  'Venezuela',
  'Otro'
]

// Código ISO 3166-1 alpha-2 (en minúscula) por país, usado para renderizar
// la bandera real via la librería flag-icons (clase css `fi fi-<codigo>`).
// Se separa del nombre para que el texto guardado en la base quede limpio
// y la bandera se pueda dibujar como icono en vez de depender de la fuente
// de emojis del sistema operativo (en Windows 10 no muestra banderas).
export const PAIS_FLAG_CODES = {
  Albania: 'al',
  Alemania: 'de',
  Andorra: 'ad',
  Argentina: 'ar',
  Australia: 'au',
  Austria: 'at',
  Bélgica: 'be',
  Bielorrusia: 'by',
  'Bosnia y Herzegovina': 'ba',
  Brasil: 'br',
  Bulgaria: 'bg',
  Canadá: 'ca',
  Chile: 'cl',
  China: 'cn',
  Chipre: 'cy',
  Colombia: 'co',
  'Corea del Sur': 'kr',
  Croacia: 'hr',
  Dinamarca: 'dk',
  Ecuador: 'ec',
  Eslovaquia: 'sk',
  Eslovenia: 'si',
  España: 'es',
  'Estados Unidos': 'us',
  Estonia: 'ee',
  Finlandia: 'fi',
  Francia: 'fr',
  Grecia: 'gr',
  Holanda: 'nl',
  Hungría: 'hu',
  India: 'in',
  Irlanda: 'ie',
  Islandia: 'is',
  Italia: 'it',
  Letonia: 'lv',
  Liechtenstein: 'li',
  Lituania: 'lt',
  Luxemburgo: 'lu',
  'Macedonia del Norte': 'mk',
  Malta: 'mt',
  Mexico: 'mx',
  Moldavia: 'md',
  Mónaco: 'mc',
  Montenegro: 'me',
  Noruega: 'no',
  'Nueva Zelanda': 'nz',
  Paraguay: 'py',
  Peru: 'pe',
  Polonia: 'pl',
  Portugal: 'pt',
  'Puerto Rico': 'pr',
  'Reino Unido': 'gb',
  'República Checa': 'cz',
  Rumania: 'ro',
  Rusia: 'ru',
  'San Marino': 'sm',
  Serbia: 'rs',
  Suecia: 'se',
  Suiza: 'ch',
  Turquia: 'tr',
  Ucrania: 'ua',
  Uruguay: 'uy',
  Venezuela: 've'
}

// Un color distintivo por país, elegido a mano en base al color más
// característico/mayoritario de cada bandera (ej. Argentina celeste, Suiza
// rojo). Es un objeto fijo para poder editar a mano cualquier color acá si
// no te convence.
export const PAIS_COLORS = {
  Albania: '#E41E20',
  Alemania: '#FFCE00',
  Andorra: '#0018A8',
  Argentina: '#75AADB',
  Australia: '#00247D',
  Austria: '#ED2939',
  Bélgica: '#FDDA24',
  Bielorrusia: '#D22730',
  'Bosnia y Herzegovina': '#002395',
  Brasil: '#009639',
  Bulgaria: '#00966E',
  Canadá: '#FF0000',
  Chile: '#D52B1E',
  China: '#DE2910',
  Chipre: '#D57800',
  Colombia: '#FCD116',
  'Corea del Sur': '#003478',
  Croacia: '#171796',
  Dinamarca: '#C60C30',
  Ecuador: '#FFDD00',
  Eslovaquia: '#0B4EA2',
  Eslovenia: '#005DA4',
  España: '#FFC400',
  'Estados Unidos': '#3C3B6E',
  Estonia: '#0072CE',
  Finlandia: '#003580',
  Francia: '#0055A4',
  Grecia: '#0D5EAF',
  Holanda: '#FF7900',
  Hungría: '#477050',
  India: '#FF9933',
  Irlanda: '#169B62',
  Islandia: '#02529C',
  Italia: '#008C45',
  Letonia: '#9E3039',
  Liechtenstein: '#002B7F',
  Lituania: '#FDB913',
  Luxemburgo: '#00A1DE',
  'Macedonia del Norte': '#FFE600',
  Malta: '#CF142B',
  Mexico: '#006847',
  Moldavia: '#003DA5',
  Mónaco: '#CE1126',
  Montenegro: '#D4AF37',
  Noruega: '#00205B',
  'Nueva Zelanda': '#00247D',
  Paraguay: '#D52B1E',
  Peru: '#D91023',
  Polonia: '#DC143C',
  Portugal: '#046A38',
  'Puerto Rico': '#0033A0',
  'Reino Unido': '#C8102E',
  'República Checa': '#11457E',
  Rumania: '#FCD116',
  Rusia: '#0039A6',
  'San Marino': '#5EB6E4',
  Serbia: '#C6363C',
  Suecia: '#006AA7',
  Suiza: '#D52B1E',
  Turquia: '#E30A17',
  Ucrania: '#0057B7',
  Uruguay: '#0038A8',
  Venezuela: '#F1B211',
  Otro: '#888888'
}

export const COLOR_PELO_OPTIONS = [
  'Rubio',
  'Castaño',
  'Negro',
  'Pelirrojo',
  'Canoso',
  'Pelado',
  'Otro'
]

export const COLOR_PELO_COLORS = {
  Rubio: '#d6c651',
  Castaño: '#a06b3a',
  Negro: '#3a3a3a',
  Pelirrojo: '#c0522b',
  Canoso: '#b8b8b8',
  Pelado: '#e0c9a6',
  Otro: '#888888'
}

export const LUGAR_OPTIONS = [
  'Casa ajena',
  'Casa propia',
  'Boliche/Joda',
  'Hotel/AirBnB',
  'Cruising',
  'Telo',
  'Auto',
  'Calle',
  'Otro'
]

export const LUGAR_COLORS = {
  'Casa ajena': '#d4ad40',
  'Casa propia': '#4d4fce',
  'Boliche/Joda': '#8149a7',
  'Hotel/AirBnB': '#416388',
  Cruising: '#46994a',
  Telo: '#be7654',
  Auto: '#c54d5d',
  Calle: '#888888',
  Otro: '#888888'
}

export const POSICION_OPTIONS = [
  'Top',
  'Bottom',
  'Vers',
  'Ninguno'
]

export const POSICION_COLORS = {
  Top: '#c05746',
  Bottom: '#3b6ea5',
  Vers: '#FCD116',
  Ninguno: '#888888'
}

export const VISUAL_OPTIONS = [
  'Blanco',
  'Negro',
  'Mestizo',
  'Medio Oriente',
  'Asiatico',
  'No se'
]

export const VISUAL_COLORS = {
  Blanco: '#e8d9b5',
  Negro: '#3a3a3a',
  Mestizo: '#a06b3a',
  'Medio Oriente': '#2c7a7b',
  Asiatico: '#3b6ea5',
  'No se': '#888888'
}

export const BOOL_LABELS = {
  bool1: 'Chmos',
  bool2: 'Comos',
  bool3: 'Orl'
}

// Colores por booleano, usados en el desglose del dashboard de Fechas.
export const BOOL_COLORS = {
  bool1: '#5D42A9',
  bool2: '#2c7a7b',
  bool3: '#c05746'
}

// Punto de referencia para calcular "mi edad" en cada año en el dashboard
// de Edades (en <year> tenía <age> años). Editable si hace falta ajustarlo.
export const MY_AGE_REFERENCE = { year: 2021, age: 19 }
