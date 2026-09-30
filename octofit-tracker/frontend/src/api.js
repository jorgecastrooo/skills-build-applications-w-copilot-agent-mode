const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export async function fetchCollection(resource, signal) {
  const path = resource.replace(/^\/+|\/+$/g, '')
  const response = await fetch(`${API_BASE_URL}/${path}/`, { signal })

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`)
  }

  const payload = await response.json()
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  return []
}