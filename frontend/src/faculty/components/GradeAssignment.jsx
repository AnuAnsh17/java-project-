import React, { useState } from 'react';

export const GradeAssignment = ({ submission, onSave, onCancel }) => {
  const [marks, setMarks] = useState(submission?.marks || '');
  const [feedback, setFeedback] = useState(submission?.feedback || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: submission.id, marks: Number(marks), feedback });
  };

  return (
    <div className="student-card">
      <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
        Grade Submission: {submission?.studentName}
      </h3>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Assignment: {submission?.assignmentTitle} (Max Marks: {submission?.totalMarks})
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Marks Awarded</label>
          <input
            type="number"
            className="form-input"
            min={0}
            max={submission?.totalMarks || 100}
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Feedback / Remarks</label>
          <textarea
            className="form-input"
            rows={3}
            placeholder="Feedback on submission..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
          {onCancel && <button type="button" className="btn btn-outline" onClick={onCancel}>Cancel</button>}
          <button type="submit" className="btn btn-primary">Save Grade</button>
        </div>
      </form>
    </div>
  );
};
export default GradeAssignment;
