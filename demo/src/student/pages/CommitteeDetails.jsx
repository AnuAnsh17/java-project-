import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { committeeService } from '../services/committeeService';
import { ArrowLeft, Building2, ShieldCheck } from 'lucide-react';

export const CommitteeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [committee, setCommittee] = useState(null);

  useEffect(() => {
    async function load() {
      const c = await committeeService.getCommitteeById(id);
      setCommittee(c);
    }
    load();
  }, [id]);

  if (!committee) return <div>Loading committee details...</div>;

  return (
    <div>
      <button className="btn btn-outline" style={{ marginBottom: '1.25rem' }} onClick={() => navigate('/student/committees')}>
        <ArrowLeft size={16} /> Back to Committees
      </button>

      <div className="student-card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.85rem' }}>
          <Building2 size={32} color="var(--primary)" />
          <div>
            <h1 style={{ fontSize: '1.6rem', color: 'var(--primary-dark)' }}>{committee.name}</h1>
            <span className="badge badge-trust">{committee.category}</span>
          </div>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{committee.description}</p>
      </div>

      <div className="student-card">
        <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Office Bearers</h3>
        {committee.officeBearers.map((ob, i) => (
          <div key={i} style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border-light)' }}>
            <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{ob.name}</div>
            <div style={{ color: 'var(--primary-light)', fontSize: '0.85rem' }}>{ob.position}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
