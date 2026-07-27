import ExcelJS from 'exceljs'
import {
  PAIS_OPTIONS,
  COLOR_PELO_OPTIONS,
  LUGAR_OPTIONS,
  POSICION_OPTIONS,
  VISUAL_OPTIONS
} from '@/config/personaOptions'

const CATEGORY_OPTIONS = {
  pais: PAIS_OPTIONS,
  color_pelo: COLOR_PELO_OPTIONS,
  lugar: LUGAR_OPTIONS,
  posicion: POSICION_OPTIONS,
  visual: VISUAL_OPTIONS
}

const TRUE_VALUES = ['true', 'si', 'sí', 'x', '1', 'yes']
const PROB_PREFIX = /^prob\.?\s+/i
const APPROX_MARKERS = ['≈', '~', 'aprox']
// Bandera emoji (par de "regional indicator symbols") que puede venir pegada
// al nombre del pais en datos viejos/externos; se saca antes de comparar.
const FLAG_EMOJI_SUFFIX = /[\u{1F1E6}-\u{1F1FF}]{2}\s*$/gu

function cellText(cell) {
  const v = cell?.value
  if (v == null) return ''
  if (typeof v === 'object' && 'text' in v) return String(v.text).trim()
  if (typeof v === 'object' && 'richText' in v) {
    return v.richText.map((t) => t.text).join('').trim()
  }
  if (typeof v === 'object' && 'result' in v) return String(v.result ?? '').trim()
  return String(v).trim()
}

function toBool(cell) {
  if (typeof cell?.value === 'boolean') return cell.value
  return TRUE_VALUES.includes(cellText(cell).toLowerCase())
}

function toAgeInfo(cell) {
  const text = cellText(cell)
  const n = parseInt(text, 10)
  const aproximada = APPROX_MARKERS.some((marker) => text.toLowerCase().includes(marker))
  return { edad: Number.isNaN(n) ? null : n, aproximada }
}

function pad(n) {
  return String(n).padStart(2, '0')
}

function toDate(cell) {
  const v = cell?.value
  if (v instanceof Date) {
    return `${v.getUTCFullYear()}-${pad(v.getUTCMonth() + 1)}-${pad(v.getUTCDate())}`
  }
  const text = cellText(cell)
  return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : null
}

function matchCategory(field, rawValue) {
  const value = rawValue.trim()
  if (!value) return { value: '', mismatch: false }
  const options = CATEGORY_OPTIONS[field]
  const mismatch = !options.some((opt) => opt.toLowerCase() === value.toLowerCase())
  return { value, mismatch }
}

function matchPais(rawValue) {
  const trimmed = rawValue.trim()
  const probable = PROB_PREFIX.test(trimmed)
  const withoutPrefix = trimmed.replace(PROB_PREFIX, '').replace(FLAG_EMOJI_SUFFIX, '').trim()
  const { value, mismatch } = matchCategory('pais', withoutPrefix)
  return { value, probable, mismatch }
}

export async function parseImportWorkbook(arrayBuffer) {
  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.load(arrayBuffer)
  const worksheet = workbook.worksheets[0]

  const rows = []
  worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber === 1) return

    const nombre = cellText(row.getCell(1))
    if (!nombre) return

    const pais = matchPais(cellText(row.getCell(2)))
    const ageInfo = toAgeInfo(row.getCell(4))
    const colorPelo = matchCategory('color_pelo', cellText(row.getCell(8)))
    const lugar = matchCategory('lugar', cellText(row.getCell(13)))
    const posicion = matchCategory('posicion', cellText(row.getCell(14)))
    const visual = matchCategory('visual', cellText(row.getCell(15)))

    rows.push({
      sheetRowNumber: rowNumber,
      nombre,
      pais: pais.value,
      pais_probable: pais.probable,
      fecha: toDate(row.getCell(3)),
      edad: ageInfo.edad,
      edad_aproximada: ageInfo.aproximada,
      descripcion: cellText(row.getCell(5)),
      barrio: cellText(row.getCell(6)),
      instagram: cellText(row.getCell(7)),
      color_pelo: colorPelo.value,
      bool1: toBool(row.getCell(10)),
      bool2: toBool(row.getCell(11)),
      bool3: toBool(row.getCell(12)),
      lugar: lugar.value,
      posicion: posicion.value,
      visual: visual.value,
      imageBuffer: null,
      imageExtension: null,
      mismatches: {
        pais: pais.mismatch,
        color_pelo: colorPelo.mismatch,
        lugar: lugar.mismatch,
        posicion: posicion.mismatch,
        visual: visual.mismatch
      }
    })
  })

  const rowIndexBySheetRow = new Map(rows.map((r, i) => [r.sheetRowNumber, i]))

  worksheet.getImages().forEach((img) => {
    const sheetRowNumber = Math.round(img.range.tl.nativeRow) + 1
    const rowIndex = rowIndexBySheetRow.get(sheetRowNumber)
    if (rowIndex == null) return
    const media = workbook.getImage(Number(img.imageId))
    if (!media?.buffer) return
    rows[rowIndex].imageBuffer = media.buffer
    rows[rowIndex].imageExtension = media.extension
  })

  const mismatchValues = new Set()
  rows.forEach((row) => {
    Object.entries(row.mismatches).forEach(([field, isMismatch]) => {
      if (isMismatch) mismatchValues.add(`${field}: "${row[field]}"`)
    })
  })

  return {
    rows,
    mismatchValues: [...mismatchValues]
  }
}
