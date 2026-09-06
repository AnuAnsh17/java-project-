import React from 'react';
import { AttendanceRow } from './AttendanceRow';

export const AttendanceTable = ({ students, attendanceMap, onToggle }) => {
  return (
    <div className="admin-table-container">
      <table className="attendance-register-table">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Student Name</th>
            <th>College Email</th>
            <th>Attendance Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <AttendanceRow
              key={student.id}
              student={student}
              status={attendanceMap[student.id] || 'Present'}
              onToggle={() => onToggle(student.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AttendanceTable;
