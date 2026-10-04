import React, { useState, useEffect } from 'react';
import { noticeManagementService } from '../services/noticeManagementService';
import { PlusCircle, Trash2 } from 'lucide-react';
import { apiErrorMessage } from '../../services/api';

export const ManageNotices = () => {
  const [notices, setNotices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState('Important');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try { setError(''); setNotices(await noticeManagementService.getNotices()); }
      catch (e) { setError(apiErrorMessage(e, 'Notices could not be loaded.')); }
      finally { setLoading(false); }
    }
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title) return;
    try {
      setSaving(true); setError('');
      const created = await noticeManagementService.createNotice({ title, content, priority });
      setNotices((items) => [created, ...items]); setTitle(''); setContent(''); setShowModal(false);
    } catch (e) { setError(apiErrorMessage(e, 'Notice could not be published.')); }
    finally { setSaving(false); }
  };

  const handleArchive = async (id) => {
    try { setError(''); await noticeManagementService.archiveNotice(id); setNotices((items) => items.filter((item) => item.id !== id)); }
    catch (e) { setError(apiErrorMessage(e, 'Notice could not be deleted.')); }
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

      {error && <div className="student-card" role="alert">{error}</div>}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Notice Title</th>
              <th>Issuing Authority</th>
              <th>Priority</th>
              <th>Publish Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan="6">Loading notices…</td></tr> : notices.length === 0 ? <tr><td colSpan="6">No published notices yet.</td></tr> : notices.map(n => (
              <tr key={n.id}>
                <td style={{ fontWeight: '600', color: 'var(--primary-dark)' }}>{n.title}</td>
                <td>{n.issuingAuthority}</td>
                <td><span style={{ color: n.priority === 'Important' ? 'var(--error)' : 'var(--text-muted)', fontWeight: '700' }}>{n.priority}</span></td>
                <td>{n.publishDate}</td>
                <td><span className={`status-badge ${n.status === 'Published' ? 'status-published' : 'status-suspended'}`}>{n.status}</span></td>
                <td>
                  {n.status === 'Published' && (
                    <button className="btn btn-outline" style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem' }} onClick={() => handleArchive(n.id)}>
                      <Trash2 size={14} /> Delete
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
                <label className="form-label">Notice details</label>
                <textarea className="form-input" rows={4} value={content} onChange={(e) => setContent(e.target.value)} required />
              </div>
              <p className="form-hint">This notice is visible to the campus community. The current API does not support choosing an audience or issuing authority.</p>
              <div className="form-group">
                <label className="form-label">Priority Label</label>
                <select className="form-input" value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="Important">Important / Urgent</option>
                  <option value="Normal">Normal Announcement</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Publishing…' : 'Publish Circular'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
