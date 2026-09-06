import React from 'react';

export const AttendanceSummary = ({ total, present, absent, percentage }) => {
  return (
    <div className="grid-3" style={{ marginBottom: '1.5rem' }}>
      <div className="student-card" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Students</div>
        <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary-dark)' }}>{total}</div>
      </div>
      <div className="student-card" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Present Today</div>
        <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--success)' }}>{present}</div>
      </div>
      <div className="student-card" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Absent Today</div>
        <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--error)' }}>{absent}</div>
      </div>
    </div>
  );
};
export default AttendanceSummary;
