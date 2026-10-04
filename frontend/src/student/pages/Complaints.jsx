import React, { useCallback, useEffect, useState } from 'react';
import { complaintService } from '../services/complaintService';
import { ShieldAlert, PlusCircle, Lock, RefreshCw } from 'lucide-react';
import { apiErrorMessage } from '../../services/api';

export const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Academic');
  const [identityMode, setIdentityMode] = useState('Anonymous');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadComplaints = useCallback(async () => {
    setLoading(true);
    setError('');
    try { setComplaints(await complaintService.getComplaints()); }
    catch (requestError) { setError(apiErrorMessage(requestError, 'Your reports could not be loaded.')); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { loadComplaints(); }, [loadComplaints]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError('');
    setMessage('');
    try {
      const created = await complaintService.submitComplaint({ subject, category, identityMode, description });
      setComplaints((items) => [created, ...items]);
      setMessage('Your report was submitted.');
      setSubject('');
      setDescription('');
      setShowForm(false);
    } catch (requestError) {
      setError(apiErrorMessage(requestError, 'Your report could not be submitted.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="workspace-page">
      <div className="student-page-header">
        <div className="student-page-title"><h1>Complaints & grievances</h1><p>Share a campus concern. You can choose whether your name is shown to administrators.</p></div>
        <button className="btn btn-primary" onClick={() => { setShowForm((open) => !open); setError(''); }}><PlusCircle size={18} /> {showForm ? 'Close form' : 'Submit a report'}</button>
      </div>

      {message && <div className="success-notice" role="status">{message}</div>}
      {error && <div className="student-card api-error-state" role="alert"><span>{error}</span>{!showForm && <button className="btn btn-outline" onClick={loadComplaints}><RefreshCw size={15} /> Retry</button>}</div>}

      {showForm && <section className="student-card complaint-form-card">
        <div className="student-section-heading"><div><span className="section-kicker">PRIVATE TO CAMPUS ADMINISTRATORS</span><h2>New report</h2></div></div>
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label className="form-label" htmlFor="complaint-subject">Subject</label><input id="complaint-subject" className="form-input" placeholder="Briefly describe the concern" maxLength={180} value={subject} onChange={(event) => setSubject(event.target.value)} required /></div>
          <div className="form-group"><label className="form-label" htmlFor="complaint-category">Category</label><select id="complaint-category" className="form-input" value={category} onChange={(event) => setCategory(event.target.value)}><option>Academic</option><option>Faculty</option><option>Infrastructure & Safety</option><option>Club / Committee</option><option>Harassment / Bullying</option><option>Other</option></select></div>
          <fieldset className="identity-choice-group"><legend className="form-label">Identity preference</legend>
            <label className={`identity-choice ${identityMode === 'Anonymous' ? 'selected' : ''}`}><input type="radio" name="identityMode" checked={identityMode === 'Anonymous'} onChange={() => setIdentityMode('Anonymous')} /><Lock size={16} /><span><strong>Submit anonymously</strong><small>Your name is not shown in the report.</small></span></label>
            <label className={`identity-choice ${identityMode === 'Identified' ? 'selected' : ''}`}><input type="radio" name="identityMode" checked={identityMode === 'Identified'} onChange={() => setIdentityMode('Identified')} /><ShieldAlert size={16} /><span><strong>Include my name</strong><small>Administrators can see your account name.</small></span></label>
          </fieldset>
          <div className="form-group"><label className="form-label" htmlFor="complaint-description">Details</label><textarea id="complaint-description" className="form-input" rows={5} maxLength={10000} placeholder="Add enough detail to help the college understand the issue." value={description} onChange={(event) => setDescription(event.target.value)} required /></div>
          <div className="form-actions"><button type="button" className="btn btn-outline" onClick={() => setShowForm(false)} disabled={submitting}>Cancel</button><button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? 'Submitting…' : 'Submit report'}</button></div>
        </form>
      </section>}

      {loading && <div className="student-card" role="status">Loading your reports…</div>}
      {!loading && !error && complaints.length === 0 && <div className="student-card dashboard-empty"><span className="empty-icon"><ShieldAlert size={20} /></span><h3>No reports submitted</h3><p>Your reports will appear here so you can keep track of their status.</p><button className="btn btn-outline" onClick={() => setShowForm(true)}>Submit your first report</button></div>}
      {!loading && complaints.map((item) => <article key={item.id} className="student-card complaint-record">
        <div className="complaint-record-head"><span className="badge badge-college">{item.category || 'General'}</span><span className="status-badge status-pending">{item.status}</span></div>
        <h2>{item.subject}</h2><p>{item.description}</p>
        <div className="complaint-record-foot"><span>{item.identityMode === 'Anonymous' ? 'Submitted anonymously' : 'Submitted with your identity'}</span><span>Report #{item.id}</span></div>
      </article>)}
    </div>
  );
};
