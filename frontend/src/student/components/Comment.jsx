import React from 'react';
import { User } from 'lucide-react';

export const Comment = ({ comment }) => {
  return (
    <div style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border-light)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
        <span style={{ fontWeight: '600', fontSize: '0.85rem', color: 'var(--text-primary)' }}>{comment.authorName}</span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{comment.timeAgo}</span>
      </div>
      <div style={{ fontSize: '0.78rem', color: 'var(--primary-light)', marginBottom: '0.35rem' }}>{comment.authorRole}</div>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{comment.content}</p>
    </div>
  );
};
