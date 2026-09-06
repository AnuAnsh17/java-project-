import React from 'react';
import { Eye, ShieldOff } from 'lucide-react';

export const FacultyTable = ({ faculty, onToggleStatus }) => {
  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>College Email</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Assigned Classes</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {faculty.map((fac) => (
            <tr key={fac.id}>
              <td style={{ fontWeight: '600', color: 'var(--primary-dark)' }}>{fac.name}</td>
              <td>{fac.email}</td>
              <td>{fac.department}</td>
              <td>{fac.designation}</td>
              <td>
                {fac.assignedClasses.map((cls, i) => (
                  <span key={i} className="badge badge-trust" style={{ marginRight: '4px', fontSize: '0.7rem' }}>
                    {cls}
                  </span>
                ))}
              </td>
              <td>
                <span className={`status-badge ${fac.status === 'Active' ? 'status-active' : 'status-suspended'}`}>
                  {fac.status}
                </span>
              </td>
              <td>
                <button
                  className="btn btn-outline"
                  style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem', color: fac.status === 'Active' ? 'var(--error)' : 'var(--success)' }}
                  onClick={() => onToggleStatus(fac.id)}
                >
                  {fac.status === 'Active' ? 'Suspend' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
