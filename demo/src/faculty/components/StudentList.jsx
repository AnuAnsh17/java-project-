import React from 'react';

export const StudentList = ({ students }) => {
  if (!students || students.length === 0) {
    return <div className="text-muted" style={{ padding: '1rem' }}>No enrolled students found.</div>;
  }

  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Student Name</th>
            <th>College Email</th>
            <th>Attendance %</th>
            <th>Assignment Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id || s.rollNo}>
              <td style={{ fontFamily: 'monospace', fontWeight: '600' }}>{s.rollNo}</td>
              <td style={{ fontWeight: '600', color: 'var(--primary-dark)' }}>{s.name}</td>
              <td>{s.email}</td>
              <td style={{ fontWeight: '700', color: s.attendancePercentage >= 75 ? 'var(--success)' : 'var(--error)' }}>
                {s.attendancePercentage}%
              </td>
              <td><span className="badge badge-trust">{s.assignmentStatus || 'Up-to-date'}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default StudentList;
