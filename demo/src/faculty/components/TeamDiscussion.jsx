import React, { useState } from 'react';
import { Send, Pin } from 'lucide-react';

export const TeamDiscussion = ({ discussions = [], onPostMessage }) => {
  const [msg, setMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    onPostMessage && onPostMessage(msg);
    setMsg('');
  };

  return (
    <div className="student-card">
      <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: 'var(--primary-dark)' }}>Team Discussion Thread</h3>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <input
          type="text"
          className="form-input"
          placeholder="Start a discussion or send announcement to team..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit" className="btn btn-primary"><Send size={16} /></button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {discussions.map((d, index) => (
          <div key={d.id || index} style={{ padding: '0.85rem', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
              <span style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--primary-dark)' }}>{d.author}</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{d.time}</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>{d.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TeamDiscussion;
