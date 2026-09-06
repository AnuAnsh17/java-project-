import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { teamService } from '../services/teamService';
import { ArrowLeft, GraduationCap, Users, MessageSquare, Send } from 'lucide-react';

export const TeamDetailsFaculty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [discText, setDiscText] = useState('');

  useEffect(() => {
    async function load() {
      const t = await teamService.getTeamById(id || 'team-1');
      setTeam(t);
    }
    load();
  }, [id]);

  const handlePostDisc = async (e) => {
    e.preventDefault();
    if (!discText.trim()) return;
    const updated = await teamService.postDiscussion(team.id, discText);
    setTeam(updated);
    setDiscText('');
  };

  if (!team) return <div>Loading team details...</div>;

  return (
    <div>
      <button className="btn btn-outline" style={{ marginBottom: '1.25rem' }} onClick={() => navigate('/faculty/teams')}>
        <ArrowLeft size={16} /> Back to Teams
      </button>

      <div className="student-card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
          <GraduationCap size={28} color="#0284c7" />
          <h1 style={{ fontSize: '1.6rem', color: 'var(--primary-dark)' }}>{team.name}</h1>
        </div>
        <p style={{ color: 'var(--primary-light)', fontWeight: '600', marginBottom: '0.85rem' }}>Subject: {team.subject}</p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{team.description}</p>
      </div>

      <div className="grid-2">
        <div className="student-card">
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Team Discussion Board</h3>

          <form onSubmit={handlePostDisc} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <input type="text" className="form-input" placeholder="Post a message to team..." value={discText} onChange={(e) => setDiscText(e.target.value)} />
            <button type="submit" className="btn btn-primary"><Send size={16} /></button>
          </form>

          {team.discussions.map(d => (
            <div key={d.id} style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border-light)' }}>
              <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{d.author} <span style={{ fontWeight: '400', fontSize: '0.78rem', color: 'var(--text-muted)' }}>• {d.time}</span></div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{d.text}</p>
            </div>
          ))}
        </div>

        <div className="student-card">
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Enrolled Students</h3>
          {team.members.map(m => (
            <div key={m.id} style={{ padding: '0.6rem 0', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{m.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{m.email}</div>
              </div>
              <span style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{m.rollNo}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
