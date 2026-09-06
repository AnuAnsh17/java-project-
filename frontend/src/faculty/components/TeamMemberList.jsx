import React from 'react';
import { UserMinus } from 'lucide-react';

export const TeamMemberList = ({ members, onRemoveMember }) => {
  if (!members || members.length === 0) {
    return <div className="text-muted" style={{ padding: '1rem' }}>No team members added yet.</div>;
  }

  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Student Name</th>
            <th>College Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {members.map(m => (
            <tr key={m.id || m.email}>
              <td style={{ fontFamily: 'monospace', fontWeight: '600' }}>{m.rollNo}</td>
              <td style={{ fontWeight: '600', color: 'var(--primary-dark)' }}>{m.name}</td>
              <td>{m.email}</td>
              <td><span className="badge badge-trust">Active Member</span></td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline"
                  style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', color: 'var(--error)', borderColor: 'var(--error)' }}
                  onClick={() => onRemoveMember && onRemoveMember(m.id)}
                >
                  <UserMinus size={13} /> Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TeamMemberList;
