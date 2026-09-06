import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Clock } from 'lucide-react';

export const ClassCard = ({ classItem }) => {
  const navigate = useNavigate();

  return (
    <div className="student-card student-card-hover" style={{ cursor: 'pointer' }} onClick={() => navigate(`/faculty/classes/${classItem.id}`)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
        <span className="badge badge-trust">{classItem.subjectCode}</span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{classItem.semester}</span>
      </div>

      <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', marginBottom: '0.4rem' }}>{classItem.subjectName}</h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--primary-light)', fontWeight: '600', marginBottom: '0.85rem' }}>
        {classItem.year} — {classItem.division}
      </p>

      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={14} /> {classItem.schedule}</div>
      </div>

      <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
        <Users size={14} /> {classItem.studentsCount} Enrolled Students
      </div>
    </div>
  );
};
