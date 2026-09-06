import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventService } from '../services/eventService';
import { ArrowLeft, Calendar, MapPin, Clock } from 'lucide-react';

export const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    async function load() {
      const ev = await eventService.getEventById(id);
      setEvent(ev);
    }
    load();
  }, [id]);

  if (!event) return <div>Loading event details...</div>;

  return (
    <div>
      <button className="btn btn-outline" style={{ marginBottom: '1.25rem' }} onClick={() => navigate('/student/events')}>
        <ArrowLeft size={16} /> Back to Events
      </button>

      <div className="student-card">
        <span className="badge badge-trust" style={{ marginBottom: '0.5rem' }}>{event.category}</span>
        <h1 style={{ fontSize: '1.8rem', color: 'var(--primary-dark)', marginBottom: '0.4rem' }}>{event.title}</h1>
        <p style={{ color: 'var(--primary-light)', fontWeight: '600', marginBottom: '1rem' }}>Organized by {event.organizer}</p>

        <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', marginBottom: '1.25rem', display: 'flex', gap: '2rem' }}>
          <div><Calendar size={16} /> {event.date}</div>
          <div><Clock size={16} /> {event.time}</div>
          <div><MapPin size={16} /> {event.venue}</div>
        </div>

        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{event.description}</p>
      </div>
    </div>
  );
};
