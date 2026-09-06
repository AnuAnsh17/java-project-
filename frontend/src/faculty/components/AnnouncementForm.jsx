import React, { useState } from 'react';

export const AnnouncementForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('SE IT Division A');
  const [priority, setPriority] = useState('Normal');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, target, priority, message });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Announcement Title</label>
        <input type="text" className="form-input" placeholder="e.g. Practical Exam Schedule" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div className="form-group">
        <label className="form-label">Target Audience</label>
        <select className="form-input" value={target} onChange={(e) => setTarget(e.target.value)}>
          <option value="SE IT Division A">SE IT Division A</option>
          <option value="BE IT Division B">BE IT Division B</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Priority</label>
        <select className="form-input" value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Normal">Normal</option>
          <option value="Important">Important</option>
          <option value="Urgent">Urgent</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Message Content</label>
        <textarea className="form-input" rows={4} placeholder="Announcement text..." value={message} onChange={(e) => setMessage(e.target.value)} required />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
        {onCancel && <button type="button" className="btn btn-outline" onClick={onCancel}>Cancel</button>}
        <button type="submit" className="btn btn-primary">Publish Announcement</button>
      </div>
    </form>
  );
};
export default AnnouncementForm;
