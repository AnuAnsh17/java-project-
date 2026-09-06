import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { teamService } from '../services/teamService';
import { TeamCardFaculty } from '../components/TeamCard';
import { PlusCircle } from 'lucide-react';

export const TeamsFaculty = () => {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

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
          <h1>Faculty Academic Teams</h1>
          <p>Create and manage class project groups, lab batches, and research teams</p>
        </div>

        <button className="btn btn-primary" onClick={() => navigate('/faculty/teams/create')}>
          <PlusCircle size={18} /> Create New Team
        </button>
      </div>

      <div className="grid-2">
        {teams.map(t => <TeamCardFaculty key={t.id} team={t} />)}
      </div>
    </div>
  );
};
