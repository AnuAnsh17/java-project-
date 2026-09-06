import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users } from 'lucide-react';

export const TeamCardFaculty = ({ team }) => {
  const navigate = useNavigate();

  return (
    <div className="student-card student-card-hover" style={{ cursor: 'pointer' }} onClick={() => navigate(`/faculty/teams/${team.id}`)}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
        <GraduationCap size={24} color="#0284c7" />
        <h3 style={{ fontSize: '1.15rem' }}>{team.name}</h3>
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>Subject: {team.subject}</p>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{team.description}</p>
      <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
        <Users size={14} /> {team.membersCount} Enrolled Students
      </div>
    </div>
  );
};
