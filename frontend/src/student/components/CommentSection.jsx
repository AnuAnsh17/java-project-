import React, { useState } from 'react';
import { Comment } from './Comment';
import { Send } from 'lucide-react';

export const CommentSection = ({ comments, onAddComment }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddComment(text);
    setText('');
  };

  return (
    <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
      <h4 style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>Comments ({comments.length})</h4>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          className="form-input"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ padding: '0.5rem 1rem' }}
        />
        <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem' }}>
          <Send size={16} />
        </button>
      </form>

      <div>
        {comments.map(c => <Comment key={c.id} comment={c} />)}
      </div>
    </div>
  );
};
