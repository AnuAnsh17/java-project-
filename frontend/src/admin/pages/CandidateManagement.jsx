import React, { useState, useEffect } from 'react';
import { electionManagementService } from '../services/electionManagementService';
import { CheckCircle, XCircle } from 'lucide-react';

export const CandidateManagement = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    async function load() {
      const c = await electionManagementService.getCandidates();
      setCandidates(c);
    }
    load();
  }, []);

  const handleUpdate = async (id, status) => {
    const updated = await electionManagementService.updateCandidateStatus(id, status);
    setCandidates(updated);
  };

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>Candidate Application Review</h1>
          <p>Approve or reject student nominations for campus elections</p>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Candidate Name</th>
              <th>Email & Branch</th>
              <th>Election & Position</th>
              <th>Manifesto</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map(cand => (
              <tr key={cand.id}>
                <td style={{ fontWeight: '600', color: 'var(--primary-dark)' }}>{cand.name}</td>
                <td>{cand.studentEmail} ({cand.branch})</td>
                <td>{cand.electionTitle} — <strong>{cand.position}</strong></td>
                <td style={{ maxWidth: '300px', fontSize: '0.85rem' }}>{cand.manifesto}</td>
                <td><span className={`status-badge ${cand.status === 'Approved' ? 'status-active' : cand.status === 'Rejected' ? 'status-suspended' : 'status-pending'}`}>{cand.status}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.78rem', color: 'var(--success)' }} onClick={() => handleUpdate(cand.id, 'Approved')}>
                      <CheckCircle size={14} /> Approve
                    </button>
                    <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.78rem', color: 'var(--error)' }} onClick={() => handleUpdate(cand.id, 'Rejected')}>
                      <XCircle size={14} /> Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
