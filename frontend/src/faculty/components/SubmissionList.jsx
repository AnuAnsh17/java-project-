import React from 'react';
import { SubmissionCard } from './SubmissionCard';

export const SubmissionList = ({ submissions, onGrade }) => {
  if (!submissions || submissions.length === 0) {
    return <div className="student-card" style={{ padding: '1.5rem', color: 'var(--text-muted)' }}>No submissions pending.</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {submissions.map(sub => (
        <SubmissionCard key={sub.id} submission={sub} onGrade={onGrade} />
      ))}
    </div>
  );
};
export default SubmissionList;
