import React, { useEffect, useState } from "react"
import "../index.css"
import { useParams, useNavigate, Link } from "react-router-dom"
import BookingForm from "../components/BookingForm"
import { useAuth } from "../context/AuthContext"

export default function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  
  useEffect(() => {
    async function loadEvent() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`https://e45008af4b19.ngrok-free.app/api/v1/Event/${id}`)
        if (!res.ok) throw new Error("Failed to fetch event")
        const data = await res.json()
        setEvent(data)
      } catch (err) {
        setError(err.message || "Failed to load event")
      } finally {
        setLoading(false)
      }
    }

    loadEvent()
  }, [id])

  if (loading) return <div>Loading...</div>
  if (error) return <div style={{ color: "#dc2626" }}>{error}</div>
  if (!event) return <div>No event found</div>

  const eventDate = new Date(event.eventDate)
  const isFull = typeof event.capacity === "number" && event.bookingsCount >= event.capacity

  return (
    <div className="card" style={{ position: "relative" }}>
      
      <Link to="/events"><button
    
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          border: "none",
          background: "transparent",
          fontSize: "1.5rem",
          cursor: "pointer",
          color: "#dc2626",
        }}
        aria-label="Close"
      >
        &times;
      </button></Link>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "60%" }}>
        <div>
          {/* Title */}
          <h1 style={{ margin: 0 }}>{event.title}</h1>

          {/* Event Date/Time */}
          <div className="small muted">Date/Time: {eventDate.toLocaleString()}</div>

          {/* Location */}
          <div className="small muted">Location: {event.location}</div>

          {/* Capacity */}
          <div className="small muted">Capacity: {event.capacity}</div>

          {/* Summary */}
          <div className="prose" style={{ marginTop: "1rem" }} dangerouslySetInnerHTML={{ __html: event.summary }} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: "1.5rem" }}>
        {user ? (
          <BookingForm eventId={event.id} />
        ) : (
          <Link
            to="/login"
            className="link"
            state={{ from: `/events/${event.id}` }} 
          >
            Login to book
          </Link>
        )}

        {isFull && <span style={{ color: "#dc2626", fontWeight: "bold" }}>Event Full</span>}
      </div>
    </div>
  )
}
