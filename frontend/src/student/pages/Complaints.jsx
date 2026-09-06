import React, { useState, useEffect } from 'react';
import { complaintService } from '../services/complaintService';
import { ShieldAlert, PlusCircle, Lock } from 'lucide-react';

export const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Academic');
  const [identityMode, setIdentityMode] = useState('Anonymous');
  const [description, setDescription] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    async function load() {
      const c = await complaintService.getComplaints();
      setComplaints(c);
    }
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !description) return;
    await complaintService.submitComplaint({ subject, category, identityMode, description });
    const updated = await complaintService.getComplaints();
    setComplaints(updated);
    setMsg('Grievance report submitted successfully.');
    setSubject('');
    setDescription('');
    setShowForm(false);
  };

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>Student Complaints & Grievances</h1>
          <p>Submit campus concerns with full choice over identity disclosure</p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <PlusCircle size={18} /> Submit New Report
        </button>
      </div>

      {msg && (
        <div style={{ background: '#dcfce7', padding: '1rem', borderRadius: 'var(--radius-md)', color: '#15803d', marginBottom: '1.5rem' }}>
          {msg}
        </div>
      )}

      {showForm && (
        <div className="student-card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>New Grievance Report</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Subject</label>
              <input
                type="text"
                className="form-input"
                placeholder="Brief title of concern"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Academic">Academic</option>
                <option value="Faculty">Faculty</option>
                <option value="Infrastructure & Safety">Infrastructure & Safety</option>
                <option value="Club / Committee">Club / Committee</option>
                <option value="Harassment / Bullying">Harassment / Bullying</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Identity Preference</label>
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.4rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="idMode"
                    value="Identified"
                    checked={identityMode === 'Identified'}
                    onChange={() => setIdentityMode('Identified')}
                  />
                  Identified (Name visible to authorized admin)
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="idMode"
                    value="Anonymous"
                    checked={identityMode === 'Anonymous'}
                    onChange={() => setIdentityMode('Anonymous')}
                  />
                  <Lock size={14} color="var(--primary-light)" />
                  Submit Anonymously
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-input"
                rows={4}
                placeholder="Detailed description of your concern..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Submit Report</button>
            </div>
          </form>
        </div>
      )}

      <div>
        {complaints.map(cmp => (
          <div key={cmp.id} className="student-card" style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="badge badge-trust">{cmp.category}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cmp.dateSubmitted}</span>
            </div>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-dark)', marginBottom: '0.4rem' }}>{cmp.subject}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>{cmp.description}</p>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.82rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-light)', paddingTop: '0.6rem' }}>
              <span>Status: <strong>{cmp.status}</strong></span>
              <span>Mode: <strong>{cmp.identityMode}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
