import api from './api'

export const submitBooking = async (booking) => {
  const res = await api.post('/api/event-bookings', booking)
  return res.data
}
