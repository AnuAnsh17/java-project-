import React from 'react';
import { Eye, Trash2 } from 'lucide-react';

export const StudentTable = ({ students, onDelete, onViewDetail }) => (
  <div className="admin-table-container">
    <table className="admin-table">
      <thead><tr><th>Name</th><th>Email</th><th>Department</th><th>Year</th><th>Division</th><th>Action</th></tr></thead>
      <tbody>
        {students.map((student) => <tr key={student.id}>
          <td style={{ fontWeight: 600, color: 'var(--primary-dark)' }}>{student.name}</td>
          <td>{student.email}</td><td>{student.department || '—'}</td><td>{student.year || '—'}</td><td>{student.division || '—'}</td>
          <td style={{ display: 'flex', gap: '.5rem' }}>
            <button className="btn btn-outline" onClick={() => onViewDetail(student)}><Eye size={14} /> View</button>
            <button className="btn btn-outline" onClick={() => onDelete(student.id)} aria-label={`Delete ${student.name}`}><Trash2 size={14} /> Delete</button>
          </td>
        </tr>)}
        {!students.length && <tr><td colSpan="6">No students match this filter.</td></tr>}
      </tbody>
    </table>
  </div>
);
