import React, { useState, useEffect } from 'react';
import { clubService } from '../services/clubService';
import { ClubCard } from '../components/ClubCard';

export const Clubs = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    async function loadClubs() {
      const c = await clubService.getClubs();
      setClubs(c);
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

      <div className="grid-3">
        {clubs.map(club => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>
    </div>
  );
};
