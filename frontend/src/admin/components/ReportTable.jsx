import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, ShieldAlert, Lock } from 'lucide-react';

export const ReportTable = ({ reports }) => {
  const navigate = useNavigate();

  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Subject</th>
            <th>Category</th>
            <th>Date</th>
            <th>Identity Mode</th>
            <th>Reporter</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((rep) => (
            <tr key={rep.id}>
              <td style={{ fontFamily: 'monospace', fontWeight: '600' }}>{rep.id}</td>
              <td style={{ fontWeight: '600', color: 'var(--primary-dark)' }}>{rep.subject}</td>
              <td><span className="badge badge-trust">{rep.category}</span></td>
              <td>{rep.dateSubmitted}</td>
              <td>
                {rep.identityMode === 'Anonymous' ? (
                  <span className="status-badge status-anonymous"><Lock size={12} /> Anonymous</span>
                ) : (
                  <span className="status-badge status-published">Identified</span>
                )}
              </td>
              <td>{rep.identityMode === 'Anonymous' ? <span style={{ color: 'var(--text-muted)' }}>Protected</span> : rep.reporterName}</td>
              <td>
                <span className="status-badge status-pending">{rep.status}</span>
              </td>
              <td>
                <button className="btn btn-primary" style={{ padding: '0.3rem 0.75rem', fontSize: '0.78rem' }} onClick={() => navigate(`/admin/reports/${rep.id}`)}>
                  <Eye size={14} /> Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
