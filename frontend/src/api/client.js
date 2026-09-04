const BASE = '/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }))
    throw new Error(err.detail || 'Request failed')
  }
  return res.json()
}

export const api = {
  health: () => request('/health'),

  getModels: () => request('/models'),
  getDefaultModel: () => request('/settings/default-model'),
  setDefaultModel: (model) =>
    request('/settings/default-model', { method: 'PUT', body: JSON.stringify({ default_model: model }) }),

  analyzeYouTube: (body) =>
    request('/media/youtube', { method: 'POST', body: JSON.stringify(body) }),

  analyzeSpotify: (body) =>
    request('/media/spotify', { method: 'POST', body: JSON.stringify(body) }),

  transcribeFile: (formData) =>
    fetch(`${BASE}/media/transcribe`, { method: 'POST', body: formData }).then((r) => r.json()),

  analyzeSocial: (platform, target, pattern, model) =>
    request(`/social/${platform}?target=${encodeURIComponent(target)}&pattern=${encodeURIComponent(pattern)}${model ? `&model=${encodeURIComponent(model)}` : ''}`, { method: 'POST' }),

  scrapeWeb: (body) =>
    request('/web/scrape', { method: 'POST', body: JSON.stringify(body) }),

  analyzeDomain: (body) =>
    request('/web/domain', { method: 'POST', body: JSON.stringify(body) }),

  analyzeEmailHeaders: (body) =>
    request('/web/email-headers', { method: 'POST', body: JSON.stringify(body) }),

  analyzeLogs: (body) =>
    request('/web/logs', { method: 'POST', body: JSON.stringify(body) }),

  getResults: (limit = 20, offset = 0) =>
    request(`/results?limit=${limit}&offset=${offset}`),

  getResult: (id) => request(`/results/${id}`),
}