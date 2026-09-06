import React from 'react';

export const AnnouncementCard = ({ announcement }) => {
  const getPriorityBadgeClass = (priority) => {
    if (priority === 'Urgent') return 'status-pending';
    if (priority === 'Important') return 'badge-trust';
    return 'badge-trust';
  };

  return (
    <div className="student-card" style={{ marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'center' }}>
        <span className={`badge ${getPriorityBadgeClass(announcement.priority)}`}>{announcement.target}</span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{announcement.date}</span>
      </div>
      <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-dark)', marginBottom: '0.4rem' }}>{announcement.title}</h3>
      <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{announcement.message}</p>
    </div>
  );
};
export default AnnouncementCard;
