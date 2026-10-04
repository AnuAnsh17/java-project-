import React, { useState, useEffect } from 'react';
import { clubService } from '../services/clubService';
import { ClubCard } from '../components/ClubCard';
import { apiErrorMessage } from '../../services/api';

export const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClubs() {
      try { setClubs(await clubService.getClubs()); }
      catch (requestError) { setError(apiErrorMessage(requestError, 'Club directory could not be loaded.')); }
      finally { setLoading(false); }
    }
    loadClubs();
  }, []);

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>Student Clubs</h1>
          <p>Discover student-driven organizations, follow activities, and request membership</p>
        </div>
      </div>

      {loading && <div className="student-card" role="status">Loading clubs…</div>}
      {error && <div className="student-card" role="alert">{error}</div>}
      {!loading && !error && clubs.length === 0 && <div className="student-card">No clubs have been published.</div>}
      <div className="grid-3">
        {clubs.map(club => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>
    </div>
  );
};
