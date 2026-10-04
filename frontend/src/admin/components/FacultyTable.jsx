import React from 'react';
import { Trash2 } from 'lucide-react';

export const FacultyTable = ({ faculty, onDelete }) => {
  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>College Email</th>
            <th>Department</th>
            <th>Year</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {faculty.map((fac) => (
            <tr key={fac.id}>
              <td style={{ fontWeight: '600', color: 'var(--primary-dark)' }}>{fac.name}</td>
              <td>{fac.email}</td>
              <td>{fac.department}</td>
              <td>{fac.year || '—'}</td>
              <td><button className="btn btn-outline" onClick={() => onDelete(fac.id)}><Trash2 size={14} /> Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
