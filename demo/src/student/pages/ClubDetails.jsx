import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { clubService } from '../services/clubService';
import { ArrowLeft, Users, Bell, Award } from 'lucide-react';

export const ClubDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [club, setClub] = useState(null);

  useEffect(() => {
    async function load() {
      const c = await clubService.getClubById(id);
      setClub(c);
    }
    load();
  }, [id]);

  if (!club) return <div>Loading club information...</div>;

  return (
    <div>
      <button className="btn btn-outline" style={{ marginBottom: '1.25rem' }} onClick={() => navigate('/student/clubs')}>
        <ArrowLeft size={16} /> Back to Clubs
      </button>

      <div className="student-card" style={{ marginBottom: '1.5rem', padding: '0', overflow: 'hidden' }}>
        <img src={club.cover} alt={club.name} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '-40px' }}>
            <img src={club.logo} alt={club.name} style={{ width: '80px', height: '80px', borderRadius: '18px', objectFit: 'cover', border: '3px solid var(--bg-surface)' }} />
            <div>
              <h1 style={{ fontSize: '1.8rem', color: 'var(--primary-dark)' }}>{club.name}</h1>
              <span className="badge badge-trust">{club.category}</span>
            </div>
          </div>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.98rem' }}>{club.description}</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="student-card">
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={18} color="var(--primary-light)" /> Leadership & Office Bearers
          </h3>
          {club.leadership.map((l, i) => (
            <div key={i} style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border-light)' }}>
              <div style={{ fontWeight: '700', fontSize: '0.92rem' }}>{l.name}</div>
              <div style={{ color: 'var(--primary-light)', fontSize: '0.82rem' }}>{l.role}</div>
            </div>
          ))}
        </div>

        <div className="student-card">
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bell size={18} color="var(--warning)" /> Club Announcements
          </h3>
          {club.announcements.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>No recent announcements.</p>
          ) : (
            club.announcements.map((ann, i) => (
              <div key={i} style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: 'var(--radius-md)', marginBottom: '0.5rem', fontSize: '0.88rem' }}>
                {ann}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
