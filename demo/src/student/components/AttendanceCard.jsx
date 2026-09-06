import React from 'react';

export const AttendanceCard = ({ subject }) => {
  return (
    <div className="student-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <div>
          <h4 style={{ fontSize: '1.05rem', color: 'var(--primary-dark)' }}>{subject.subjectName}</h4>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{subject.subjectCode} • {subject.faculty}</span>
        </div>
        <span style={{ fontSize: '1.4rem', fontWeight: '800', color: subject.percentage >= 75 ? 'var(--success)' : 'var(--error)' }}>
          {subject.percentage}%
        </span>
      </div>

      <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', marginTop: '0.5rem' }}>
        <div style={{ width: `${subject.percentage}%`, height: '100%', background: subject.percentage >= 75 ? 'var(--success)' : 'var(--error)', borderRadius: '4px' }}></div>
      </div>

      <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'right' }}>
        Attended {subject.attended} / {subject.held} classes
      </div>
    </div>
  );
};
