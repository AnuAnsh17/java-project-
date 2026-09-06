import React, { useState } from 'react';

export const TeamForm = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('Java Programming (IT302)');
  const [targetClass, setTargetClass] = useState('SE IT Division A');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, subject, targetClass, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Team Name</label>
        <input type="text" className="form-input" placeholder="e.g. Lab Group 3" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div className="form-group">
        <label className="form-label">Subject</label>
        <input type="text" className="form-input" value={subject} onChange={(e) => setSubject(e.target.value)} required />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea className="form-input" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
        {onCancel && <button type="button" className="btn btn-outline" onClick={onCancel}>Cancel</button>}
        <button type="submit" className="btn btn-primary">Create Team</button>
      </div>
    </form>
  );
};
export default TeamForm;
