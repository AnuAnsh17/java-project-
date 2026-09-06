import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, ShieldCheck } from 'lucide-react';

export const CommitteeCard = ({ committee }) => {
  const navigate = useNavigate();

  return (
    <div
      className="student-card student-card-hover"
      style={{ cursor: 'pointer' }}
      onClick={() => navigate(`/student/committees/${committee.id}`)}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
        <Building2 size={24} color="var(--primary-light)" />
        <h3 style={{ fontSize: '1.2rem' }}>{committee.name}</h3>
      </div>
      <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{committee.description}</p>
      {committee.userPosition && (
        <span className="badge badge-college">
          Your Role: {committee.userPosition}
        </span>
      )}
    </div>
  );
};
