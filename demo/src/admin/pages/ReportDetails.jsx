import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { reportService } from '../services/reportService';
import { ArrowLeft, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ReportDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [status, setStatus] = useState('');
  const [internalNotes, setInternalNotes] = useState('');
  const [response, setResponse] = useState('');
  const [savedMsg, setSavedMsg] = useState('');

  useEffect(() => {
    async function load() {
      const r = await reportService.getReportById(id || 'cmp-101');
      setReport(r);
      if (r) {
        setStatus(r.status);
        setInternalNotes(r.internalNotes || '');
        setResponse(r.resolutionResponse || '');
      }
    }
    load();
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    const updated = await reportService.updateReport(report.id, {
      status,
      internalNotes,
      resolutionResponse: response,
      assignedAdmin: "Admin Support 1"
    });
    setReport(updated);
    setSavedMsg('Grievance investigation status and response saved successfully.');
  };

  if (!report) return <div>Loading report details...</div>;

  return (
    <div>
      <button className="btn btn-outline" style={{ marginBottom: '1.25rem' }} onClick={() => navigate('/admin/reports')}>
        <ArrowLeft size={16} /> Back to Reports
      </button>

      {savedMsg && (
        <div style={{ background: '#dcfce7', padding: '1rem', borderRadius: 'var(--radius-md)', color: '#15803d', marginBottom: '1.5rem' }}>
          {savedMsg}
        </div>
      )}

      <div className="student-card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
          <span className="badge badge-trust">{report.category}</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Date: {report.dateSubmitted}</span>
        </div>

        <h1 style={{ fontSize: '1.6rem', color: 'var(--primary-dark)', marginBottom: '0.6rem' }}>{report.subject}</h1>

        <div style={{ background: report.identityMode === 'Anonymous' ? '#f3e8ff' : '#e0f2fe', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: report.identityMode === 'Anonymous' ? '#7e22ce' : '#0369a1' }}>
          {report.identityMode === 'Anonymous' ? <Lock size={16} /> : <ShieldCheck size={16} />}
          <strong>Identity Mode:</strong> {report.identityMode === 'Anonymous' ? 'Anonymous Submission (Reporter identity hidden in admin system)' : `Identified — Reporter: ${report.reporterName} (${report.reporterEmail})`}
        </div>

        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.98rem' }}>{report.description}</p>
      </div>

      <div className="student-card">
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Administrative Action & Resolution</h3>

        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Investigation Status</label>
            <select className="form-input" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Submitted">Submitted</option>
              <option value="Under Review">Under Review</option>
              <option value="Investigating">Investigating</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Internal Administrator Notes (Confidential — Admin Only)</label>
            <textarea
              className="form-input"
              rows={3}
              placeholder="Internal notes regarding investigation steps, maintenance alerts..."
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Student-Facing Resolution Response</label>
            <textarea
              className="form-input"
              rows={3}
              placeholder="Official response sent back to student..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Save Resolution & Update Status
          </button>
        </form>
      </div>
    </div>
  );
};
