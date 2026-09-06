import React, { useState, useEffect } from 'react';
import { facultyAnnouncementService } from '../services/facultyAnnouncementService';
import { PlusCircle, Bell } from 'lucide-react';

export const AnnouncementsFaculty = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('SE IT Division A');
  const [priority, setPriority] = useState('Normal');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function load() {
      const anns = await facultyAnnouncementService.getAnnouncements();
      setAnnouncements(anns);
    }
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title || !message) return;
    await facultyAnnouncementService.createAnnouncement({ title, target, priority, message });
    const updated = await facultyAnnouncementService.getAnnouncements();
    setAnnouncements(updated);
    setTitle('');
    setMessage('');
    setShowModal(false);
  };

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>Class Announcements</h1>
          <p>Publish academic notices and lab instructions for your assigned classes</p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <PlusCircle size={18} /> Post Announcement
        </button>
      </div>

      <div>
        {announcements.map(ann => (
          <div key={ann.id} className="student-card" style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="badge badge-trust">{ann.target}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{ann.date}</span>
            </div>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-dark)', marginBottom: '0.4rem' }}>{ann.title}</h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>{ann.message}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content-box">
            <h3>Post Class Announcement</h3>
            <form onSubmit={handleCreate} style={{ marginTop: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Announcement Title</label>
                <input type="text" className="form-input" placeholder="e.g. Lab Experiment 5 Submission Guidelines" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Target Class / Group</label>
                <select className="form-input" value={target} onChange={(e) => setTarget(e.target.value)}>
                  <option value="SE IT Division A">SE IT Division A</option>
                  <option value="BE IT Division B">BE IT Division B</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Priority</label>
                <select className="form-input" value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="Normal">Normal</option>
                  <option value="Important">Important</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-input" rows={4} placeholder="Announcement text..." value={message} onChange={(e) => setMessage(e.target.value)} required />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Publish Announcement</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
