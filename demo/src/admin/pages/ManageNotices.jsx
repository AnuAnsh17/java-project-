import React, { useState, useEffect } from 'react';
import { noticeManagementService } from '../services/noticeManagementService';
import { PlusCircle, Bell, Paperclip, Archive } from 'lucide-react';

export const ManageNotices = () => {
  const [notices, setNotices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [authority, setAuthority] = useState('College Administration');
  const [audience, setAudience] = useState('All Students');
  const [priority, setPriority] = useState('Important');

  useEffect(() => {
    async function load() {
      const n = await noticeManagementService.getNotices();
      setNotices(n);
    }
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title) return;
    await noticeManagementService.createNotice({ title, issuingAuthority: authority, audience, priority });
    const updated = await noticeManagementService.getNotices();
    setNotices(updated);
    setTitle('');
    setShowModal(false);
  };

  const handleArchive = async (id) => {
    const updated = await noticeManagementService.archiveNotice(id);
    setNotices(updated);
  };

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>Official Notice Board Management</h1>
          <p>Publish verified administrative announcements, circulars, and exam timetables</p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <PlusCircle size={18} /> Publish New Notice
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Notice Title</th>
              <th>Issuing Authority</th>
              <th>Target Audience</th>
              <th>Priority</th>
              <th>Publish Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {notices.map(n => (
              <tr key={n.id}>
                <td style={{ fontWeight: '600', color: 'var(--primary-dark)' }}>{n.title}</td>
                <td>{n.issuingAuthority}</td>
                <td><span className="badge badge-trust">{n.audience}</span></td>
                <td><span style={{ color: n.priority === 'Important' ? 'var(--error)' : 'var(--text-muted)', fontWeight: '700' }}>{n.priority}</span></td>
                <td>{n.publishDate}</td>
                <td><span className={`status-badge ${n.status === 'Published' ? 'status-published' : 'status-suspended'}`}>{n.status}</span></td>
                <td>
                  {n.status === 'Published' && (
                    <button className="btn btn-outline" style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem' }} onClick={() => handleArchive(n.id)}>
                      <Archive size={14} /> Archive
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content-box">
            <h3>Publish Official Notice</h3>
            <form onSubmit={handleCreate} style={{ marginTop: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Notice Title</label>
                <input type="text" className="form-input" placeholder="e.g. End Semester Exam Timetable Autumn 2026" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Issuing Authority</label>
                <select className="form-input" value={authority} onChange={(e) => setAuthority(e.target.value)}>
                  <option value="College Administration">College Administration</option>
                  <option value="Examination Cell">Examination Cell</option>
                  <option value="Principal Office">Principal Office</option>
                  <option value="Department of IT">Department of IT</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Target Audience</label>
                <select className="form-input" value={audience} onChange={(e) => setAudience(e.target.value)}>
                  <option value="All Students">All Students</option>
                  <option value="All Faculty">All Faculty</option>
                  <option value="Students + Faculty">Students + Faculty</option>
                  <option value="SE IT Division A">SE IT Division A</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Priority Label</label>
                <select className="form-input" value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="Important">Important / Urgent</option>
                  <option value="Normal">Normal Announcement</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Publish Circular</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
