import { ref, computed } from 'vue'

/*
 * Contrato de datos CONGELADO — no modificar:
 * ic.json = { año: { mes: [issueId, ...] } } con años/meses/números ya
 * ordenados de más reciente a más antiguo dentro de cada nivel del JSON,
 * e issueId con formato "ic-NNNN-DDMMAA":
 *   slice(3, 7) → número de revista, slice(8, 10) → día del mes.
 * Los recursos viven en `${BASE}/${issueId}.png` y `${BASE}/${issueId}.pdf`.
 */
export const BASE = 'https://www.meridabadajoz.net/iglesiaencamino'

export const OLD_ARCHIVE_URL =
  'https://iglesiaencamino.meridabadajoz.net/antiguos/index.html'

export function issueNumber(id) {
  return id.slice(3, 7).replace(/^0+/, '')
}

export function issueDay(id) {
  return id.slice(8, 10).replace(/^0+/, '')
}

export function coverUrl(id) {
  return `${BASE}/${id}.png`
}

export function pdfUrl(id) {
  return `${BASE}/${id}.pdf`
}

export function issueDate(id, month, year) {
  return `${issueDay(id)} de ${month.toLowerCase()} de ${year}`
}

export function useIssues() {
  const items = ref({})
  const loading = ref(true)
  const error = ref(false)

  // Object.keys ordena las claves numéricas de forma ascendente,
  // independientemente del orden del JSON: el último año es el más reciente.
  const years = computed(() => Object.keys(items.value).reverse())

  const latest = computed(() => {
    const year = years.value[0]
    if (!year) return null
    // Los meses conservan el orden de inserción del JSON: más reciente primero.
    const month = Object.keys(items.value[year])[0]
    const id = items.value[year][month][0]
    return { id, month, year }
  })

  async function load() {
    loading.value = true
    error.value = false
    try {
      const response = await fetch(`${BASE}/ic.json`)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      items.value = await response.json()
    } catch {
      error.value = true
    } finally {
      loading.value = false
    }
  }

  return { items, loading, error, years, latest, load }
}
