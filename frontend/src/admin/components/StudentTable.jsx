import React from 'react';
import { Eye, ShieldOff, CheckCircle } from 'lucide-react';

export const StudentTable = ({ students, onToggleStatus, onViewDetail }) => {
  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Branch & Year</th>
            <th>Division</th>
            <th>Organizations / Positions</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((std) => (
            <tr key={std.id}>
              <td style={{ fontFamily: 'monospace', fontWeight: '600' }}>{std.rollNo}</td>
              <td style={{ fontWeight: '600', color: 'var(--primary-dark)' }}>{std.name}</td>
              <td>{std.email}</td>
              <td>{std.branch} ({std.year})</td>
              <td>{std.division}</td>
              <td>
                {std.organizations.length === 0 ? (
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>None</span>
                ) : (
                  std.organizations.map((org, i) => (
                    <span key={i} className="badge badge-trust" style={{ marginRight: '4px', fontSize: '0.7rem' }}>
                      {org}
                    </span>
                  ))
                )}
              </td>
              <td>
                <span className={`status-badge ${std.status === 'Active' ? 'status-active' : 'status-suspended'}`}>
                  {std.status}
                </span>
              </td>
              <td>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-outline" style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem' }} onClick={() => onViewDetail(std)}>
                    <Eye size={14} /> View
                  </button>
                  <button
                    className="btn btn-outline"
                    style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem', color: std.status === 'Active' ? 'var(--error)' : 'var(--success)' }}
                    onClick={() => onToggleStatus(std.id)}
                  >
                    {std.status === 'Active' ? <ShieldOff size={14} /> : <CheckCircle size={14} />}
                    {std.status === 'Active' ? 'Suspend' : 'Activate'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
