import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Vote, CheckCircle2 } from 'lucide-react';

export const ElectionCard = ({ election }) => {
  const navigate = useNavigate();

  return (
    <div className="student-card student-card-hover" style={{ cursor: 'pointer' }} onClick={() => navigate(`/student/elections/${election.id}`)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <span className="badge badge-trust">{election.status}</span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{election.eligibleBranch}</span>
      </div>

      <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', marginBottom: '0.4rem' }}>{election.title}</h3>
      <p style={{ fontSize: '0.95rem', color: 'var(--primary-light)', fontWeight: '600', marginBottom: '1rem' }}>Position: {election.position}</p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '0.85rem' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{election.candidates.length} Candidates</span>
        {election.userHasVoted ? (
          <span style={{ color: 'var(--success)', fontWeight: '600', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <CheckCircle2 size={16} /> Vote Cast
          </span>
        ) : (
          <button className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>Vote Now</button>
        )}
      </div>
    </div>
  );
};
