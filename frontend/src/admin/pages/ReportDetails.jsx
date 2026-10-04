import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { reportService } from '../services/reportService';
import { ArrowLeft, Lock, ShieldCheck, Save, RefreshCw } from 'lucide-react';
import { apiErrorMessage } from '../../services/api';

export const ReportDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [status, setStatus] = useState('Submitted');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const loadReport = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await reportService.getReportById(id);
      setReport(result);
      setStatus(result.status);
    } catch (requestError) {
      setError(apiErrorMessage(requestError, 'This report could not be loaded.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadReport(); }, [id]);

  const handleSave = async (event) => {
    event.preventDefault();
    if (!report || saving) return;
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      const updated = await reportService.updateReport(report.id, { ...report, status });
      setReport(updated);
      setStatus(updated.status);
      setSaved(true);
    } catch (requestError) {
      setError(apiErrorMessage(requestError, 'The report status could not be saved.'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="student-card" role="status">Loading report details…</div>;
  if (error && !report) return <div><div className="student-card api-error-state" role="alert"><span>{error}</span><button className="btn btn-outline" onClick={loadReport}><RefreshCw size={15} /> Retry</button></div><button className="btn btn-outline" onClick={() => navigate('/admin/reports')}><ArrowLeft size={16} /> Back to reports</button></div>;
  if (!report) return null;

  return (
    <div className="workspace-page">
      <button className="btn btn-outline report-back-button" onClick={() => navigate('/admin/reports')}><ArrowLeft size={16} /> Back to reports</button>
      {error && <div className="student-card api-error-state" role="alert">{error}</div>}
      {saved && <div className="success-notice" role="status">Report status saved.</div>}

      <section className="student-card report-detail-card">
        <div className="report-detail-meta"><span className="badge badge-college">{report.category || 'General'}</span><span className="status-badge status-pending">{report.status}</span></div>
        <h1>{report.subject}</h1>
        <div className={`report-identity ${report.identityMode === 'Anonymous' ? 'report-identity-private' : ''}`}>
          {report.identityMode === 'Anonymous' ? <Lock size={17} /> : <ShieldCheck size={17} />}
          <span><strong>{report.identityMode === 'Anonymous' ? 'Anonymous report' : 'Identified report'}</strong>{report.identityMode === 'Anonymous' ? ' · Reporter identity is hidden.' : ` · Submitted by ${report.reporterName || 'Campus member'}.`}</span>
        </div>
        <p className="report-description">{report.description}</p>
      </section>

      <section className="student-card">
        <div className="student-section-heading"><div><span className="section-kicker">REVIEW</span><h2>Update report status</h2></div></div>
        <p className="report-capability-note">The current API stores the report and its status. Internal notes and resolution messages are not part of the persisted report record.</p>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label" htmlFor="report-status">Status</label>
            <select id="report-status" className="form-input" value={status} onChange={(event) => { setStatus(event.target.value); setSaved(false); }}>
              <option>Submitted</option>
              <option>Under review</option>
              <option>Investigating</option>
              <option>Resolved</option>
              <option>Rejected</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" disabled={saving || status === report.status}><Save size={16} /> {saving ? 'Saving…' : 'Save status'}</button>
        </form>
      </section>
    </div>
  );
};
