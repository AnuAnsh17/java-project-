import React from 'react';
import { FileCheck, Download } from 'lucide-react';

export const SubmissionCard = ({ submission, onGrade }) => {
  return (
    <div className="student-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <div style={{ fontSize: '0.82rem', fontFamily: 'monospace', color: 'var(--primary-light)', fontWeight: '600' }}>
          Roll: {submission.rollNo}
        </div>
        <h4 style={{ fontSize: '1.05rem', color: 'var(--primary-dark)', margin: '0.2rem 0' }}>{submission.studentName}</h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {submission.assignmentTitle} • Submitted: {submission.submissionDate}
        </p>
        <div style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
          <Download size={14} style={{ display: 'inline', marginRight: '4px' }} /> {submission.fileName}
        </div>
      </div>

      <div style={{ textAlign: 'right' }}>
        <span className={`status-badge ${submission.status === 'Graded' ? 'status-active' : 'status-pending'}`} style={{ marginBottom: '0.5rem', display: 'inline-block' }}>
          {submission.status}
        </span>
        <div>
          <button className="btn btn-primary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem' }} onClick={() => onGrade(submission)}>
            <FileCheck size={14} /> {submission.status === 'Graded' ? 'Edit Grade' : 'Grade Work'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default SubmissionCard;
