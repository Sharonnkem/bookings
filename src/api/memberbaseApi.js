import axios from 'axios'

const MEMBERBASE_BASE = import.meta.env.VITE_MEMBERBASE_BASE || 'https://demo-log.memberbase-sandbox.com'
const MEMBERBASE_KEY = import.meta.env.VITE_MEMBERBASE_KEY || ''

const memberbase = axios.create({
  baseURL: MEMBERBASE_BASE,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${MEMBERBASE_KEY}`,
  },
})

export async function createOrGetContact({ name, email }) {
  try {
    const res = await memberbase.post('/api/contacts', { name, email })
    return res.data
  } catch (err) {
    throw err?.response?.data || { message: err.message }
  }
}

export default memberbase
