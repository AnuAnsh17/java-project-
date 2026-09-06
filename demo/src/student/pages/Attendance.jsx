import React, { useState, useEffect } from 'react';
import { attendanceService } from '../services/attendanceService';
import { AttendanceCard } from '../components/AttendanceCard';

export const Attendance = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      const att = await attendanceService.getAttendance();
      setData(att);
    }
    load();
  }, []);

  if (!data) return <div>Loading attendance records...</div>;

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>Attendance Dashboard</h1>
          <p>Subject-wise attendance percentages recorded by course faculty</p>
        </div>
      </div>

      <div className="student-card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, #1e3a8a, #0f172a)', color: 'white' }}>
        <h3 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '0.4rem' }}>Overall Attendance Summary</h3>
        <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#38bdf8' }}>{data.overallPercentage}%</div>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          Total Classes Attended: {data.totalAttended} / {data.totalClassesHeld}
        </p>
      </div>

      <div className="grid-2">
        {data.subjects.map(s => <AttendanceCard key={s.subjectCode} subject={s} />)}
      </div>
    </div>
  );
};
