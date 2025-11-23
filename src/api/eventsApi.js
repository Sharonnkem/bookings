import api from './api'

export const getEvents = async (params) => {
  const res = await api.get('/api/events', { params })
  const d = res.data
  // Normalise possible shapes: array, { events: [] }, { data: [] }
  if (Array.isArray(d)) return d
  if (Array.isArray(d?.events)) return d.events
  if (Array.isArray(d?.data)) return d.data
  // fallback: empty array
  return []
}

export const getEventById = async (id) => {
  const res = await api.get(`/api/events/${id}`)
  return res.data
}
