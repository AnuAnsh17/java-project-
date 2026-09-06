import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { attendanceService } from '../services/attendanceService';
import { UserCheck, Calendar, Clock } from 'lucide-react';

export const AttendanceFaculty = () => {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const recs = await attendanceService.getAttendanceHistory();
      setRecords(recs);
    }
    load();
  }, []);

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>Attendance Portal</h1>
          <p>Record daily course attendance registers and review history</p>
        </div>

        <button className="btn btn-primary" onClick={() => navigate('/faculty/attendance/take')}>
          <UserCheck size={18} /> Take Attendance Register
        </button>
      </div>

      <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Recent Attendance Registers</h3>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Subject</th>
              <th>Class / Division</th>
              <th>Present Count</th>
              <th>Absent Count</th>
              <th>Total Students</th>
              <th>Attendance Percentage</th>
            </tr>
          </thead>
          <tbody>
            {records.map(rec => (
              <tr key={rec.id}>
                <td style={{ fontWeight: '600' }}>{rec.date}</td>
                <td style={{ fontWeight: '600', color: 'var(--primary-dark)' }}>{rec.subject}</td>
                <td><span className="badge badge-trust">{rec.class}</span></td>
                <td style={{ color: 'var(--success)', fontWeight: '700' }}>{rec.presentCount}</td>
                <td style={{ color: 'var(--error)', fontWeight: '700' }}>{rec.absentCount}</td>
                <td>{rec.totalCount}</td>
                <td style={{ fontWeight: '800', color: rec.percentage >= 75 ? 'var(--success)' : 'var(--error)' }}>
                  {rec.percentage}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
