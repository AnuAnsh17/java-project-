import React, { useState } from 'react';

export const AssignmentForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Java Programming (IT302)');
  const [targetClass, setTargetClass] = useState('SE IT Division A');
  const [deadline, setDeadline] = useState('');
  const [totalMarks, setTotalMarks] = useState(20);
  const [instructions, setInstructions] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, subject, targetClass, deadline, totalMarks: Number(totalMarks), instructions });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Assignment Title</label>
        <input type="text" className="form-input" placeholder="Title..." value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label className="form-label">Subject</label>
          <input type="text" className="form-input" value={subject} onChange={(e) => setSubject(e.target.value)} required />
        </div>
        <div className="form-group">
          <label className="form-label">Target Class</label>
          <input type="text" className="form-input" value={targetClass} onChange={(e) => setTargetClass(e.target.value)} required />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label className="form-label">Deadline</label>
          <input type="datetime-local" className="form-input" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
        </div>
        <div className="form-group">
          <label className="form-label">Maximum Marks</label>
          <input type="number" className="form-input" value={totalMarks} onChange={(e) => setTotalMarks(e.target.value)} required />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Instructions</label>
        <textarea className="form-input" rows={3} value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
        {onCancel && <button type="button" className="btn btn-outline" onClick={onCancel}>Cancel</button>}
        <button type="submit" className="btn btn-primary">Save Assignment</button>
      </div>
    </form>
  );
};
export default AssignmentForm;
