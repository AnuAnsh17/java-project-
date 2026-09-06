import React from 'react';

export const AttendanceRow = ({ student, status, onToggle }) => {
  return (
    <tr>
      <td style={{ fontFamily: 'monospace', fontWeight: '600' }}>{student.rollNo}</td>
      <td style={{ fontWeight: '600' }}>{student.name}</td>
      <td>{student.email}</td>
      <td>
        <button
          type="button"
          className={`attendance-toggle-btn ${status === 'Present' ? 'btn-present' : 'btn-absent'}`}
          onClick={onToggle}
        >
          {status}
        </button>
      </td>
    </tr>
  );
};
export default AttendanceRow;
