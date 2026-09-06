import React, { useState, useEffect } from 'react';
import { teamService } from '../services/teamService';
import { TeamCard } from '../components/TeamCard';

export const Teams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function load() {
      const t = await teamService.getTeams();
      setTeams(t);
    }
    load();
  }, []);

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>Academic Teams & Groups</h1>
          <p>Faculty-created collaboration spaces for classes, lab batches, and project teams</p>
        </div>
      </div>

      <div className="grid-2">
        {teams.map(t => <TeamCard key={t.id} team={t} />)}
      </div>
    </div>
  );
};
