import React, { useState, useEffect } from 'react';
import { eventManagementService } from '../services/eventManagementService';
import { PlusCircle, Calendar, MapPin } from 'lucide-react';

export const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [organizer, setOrganizer] = useState('College Administration');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');

  useEffect(() => {
    async function load() {
      const evs = await eventManagementService.getEvents();
      setEvents(evs);
    }
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title || !date || !venue) return;
    await eventManagementService.createEvent({ title, organizer, date, venue });
    const updated = await eventManagementService.getEvents();
    setEvents(updated);
    setTitle('');
    setDate('');
    setVenue('');
    setShowModal(false);
  };

  const handleToggleStatus = async (id) => {
    const updated = await eventManagementService.toggleStatus(id);
    setEvents(updated);
  };

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>Event Management</h1>
          <p>Oversee, publish, or cancel college-wide and organization events</p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <PlusCircle size={18} /> Create New Event
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Event Title</th>
              <th>Organizer</th>
              <th>Date & Time</th>
              <th>Venue</th>
              <th>Registrations</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map(ev => (
              <tr key={ev.id}>
                <td style={{ fontWeight: '600', color: 'var(--primary-dark)' }}>{ev.title}</td>
                <td>{ev.organizer}</td>
                <td>{ev.date} ({ev.time})</td>
                <td>{ev.venue}</td>
                <td>{ev.registrationsCount} Registered</td>
                <td><span className={`status-badge ${ev.status === 'Published' ? 'status-published' : 'status-suspended'}`}>{ev.status}</span></td>
                <td>
                  <button className="btn btn-outline" style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem' }} onClick={() => handleToggleStatus(ev.id)}>
                    {ev.status === 'Published' ? 'Cancel Event' : 'Publish'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content-box">
            <h3>Publish Campus Event</h3>
            <form onSubmit={handleCreate} style={{ marginTop: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Event Title</label>
                <input type="text" className="form-input" placeholder="e.g. Annual Tech Symposium 2026" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Organizer</label>
                <input type="text" className="form-input" placeholder="e.g. College Administration / Coding Club" value={organizer} onChange={(e) => setOrganizer(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Date</label>
                <input type="text" className="form-input" placeholder="e.g. October 10, 2026" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Venue</label>
                <input type="text" className="form-input" placeholder="e.g. Main Auditorium" value={venue} onChange={(e) => setVenue(e.target.value)} required />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Publish Event</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
