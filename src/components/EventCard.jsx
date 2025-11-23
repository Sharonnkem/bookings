import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css'

export default function EventCard({ event }) {
  const date = new Date(event.eventDate)
  return (
    <article className="card event-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 12 }}>
        <div style={{flex:1}}>
          <h3>{event.title}</h3>
          <div className="small muted">{date.toLocaleString()}</div>
        </div>
        <div className="small muted" style={{textAlign:'right'}}>
          <div>Capacity</div>
          <div style={{fontWeight:600}}>{event.capacity}</div>
        </div>
      </div>

      <p className="summary" style={{marginTop:12}}>{event.summary?.slice(0, 140)}{event.summary?.length > 140 ? '...' : ''}</p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop:12 }}>
        <Link to={`/events/${event.id}`} className="btn btn-link">View</Link>
        <div className="small muted">Booked: {event.bookingsCount || 0}</div>
      </div>
    </article>
  )
}
