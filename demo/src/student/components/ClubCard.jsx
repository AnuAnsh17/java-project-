import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, UserCheck } from 'lucide-react';
import { clubService } from '../services/clubService';

export const ClubCard = ({ club }) => {
  const navigate = useNavigate();
  const [currentClub, setCurrentClub] = useState(club);

  const handleJoin = async (e) => {
    e.stopPropagation();
    const updated = await clubService.toggleJoinClub(currentClub.id);
    setCurrentClub(updated);
  };

  const handleFollow = async (e) => {
    e.stopPropagation();
    const updated = await clubService.toggleFollowClub(currentClub.id);
    setCurrentClub(updated);
  };

  return (
    <div
      className="student-card student-card-hover"
      style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%' }}
      onClick={() => navigate(`/student/clubs/${currentClub.id}`)}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <img src={currentClub.logo} alt={currentClub.name} style={{ width: '56px', height: '56px', borderRadius: '14px', objectFit: 'cover' }} />
        <div>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-dark)' }}>{currentClub.name}</h3>
          <span className="badge badge-trust" style={{ marginTop: '4px' }}>{currentClub.category}</span>
        </div>
      </div>

      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', flex: 1, lineHeight: '1.5' }}>
        {currentClub.description}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Users size={16} /> {currentClub.membersCount} Members
        </span>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className={`btn ${currentClub.isFollowing ? 'btn-outline' : 'btn-outline'}`}
            style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem' }}
            onClick={handleFollow}
          >
            {currentClub.isFollowing ? 'Following' : 'Follow'}
          </button>
          <button
            className={`btn ${currentClub.isJoined ? 'btn-outline' : 'btn-primary'}`}
            style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem' }}
            onClick={handleJoin}
          >
            {currentClub.isJoined ? 'Joined' : 'Join Club'}
          </button>
        </div>
      </div>
    </div>
  );
};
