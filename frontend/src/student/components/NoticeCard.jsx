import React from 'react';
import { Bell, Paperclip, AlertCircle } from 'lucide-react';

export const NoticeCard = ({ notice }) => {
  return (
    <div className="student-card" style={{ marginBottom: '1.25rem', borderLeft: notice.isImportant ? '4px solid var(--error)' : '1px solid var(--border-light)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Bell size={18} color="var(--primary)" />
          <span style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--primary)' }}>{notice.issuingAuthority}</span>
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{notice.date}</span>
      </div>

      <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-dark)', marginBottom: '0.6rem' }}>
        {notice.isImportant && <span style={{ color: 'var(--error)', marginRight: '6px' }}>[IMPORTANT]</span>}
        {notice.title}
      </h3>

      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem' }}>
        {notice.content}
      </p>

      {notice.attachment && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#f1f5f9', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-md)', fontSize: '0.82rem', color: 'var(--primary-light)', fontWeight: '600' }}>
          <Paperclip size={14} /> Attachment: {notice.attachment}
        </div>
      )}
    </div>
  );
};
