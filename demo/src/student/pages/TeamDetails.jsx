import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { teamService } from '../services/teamService';
import { ArrowLeft, GraduationCap, Users, Bell } from 'lucide-react';

export const TeamDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    async function load() {
      const t = await teamService.getTeamById(id || 'team-1');
      setTeam(t);
    }
    load();
  }, [id]);

  if (!team) return <div>Loading team details...</div>;

  return (
    <div>
      <button className="btn btn-outline" style={{ marginBottom: '1.25rem' }} onClick={() => navigate('/student/teams')}>
        <ArrowLeft size={16} /> Back to Teams
      </button>

      <div className="student-card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
          <GraduationCap size={28} color="var(--primary-light)" />
          <h1 style={{ fontSize: '1.6rem', color: 'var(--primary-dark)' }}>{team.name}</h1>
        </div>
        <p style={{ color: 'var(--primary-light)', fontWeight: '600', marginBottom: '0.85rem' }}>Faculty In-Charge: {team.faculty}</p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{team.description}</p>
      </div>

      <div className="student-card">
        <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Bell size={18} color="var(--warning)" /> Team Announcements
        </h3>
        {team.announcements.map((ann, i) => (
          <div key={i} style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: 'var(--radius-md)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            {ann}
          </div>
        ))}
      </div>
    </div>
  );
};
