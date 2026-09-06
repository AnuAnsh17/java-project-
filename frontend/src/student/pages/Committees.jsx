import React, { useState, useEffect } from 'react';
import { committeeService } from '../services/committeeService';
import { CommitteeCard } from '../components/CommitteeCard';

export const Committees = () => {
  const [committees, setCommittees] = useState([]);

  useEffect(() => {
    async function load() {
      const comms = await committeeService.getCommittees();
      setCommittees(comms);
    }
    load();
  }, []);

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>College Committees</h1>
          <p>Formal organizational bodies and administrative student councils</p>
        </div>
      </div>

      <div className="grid-2">
        {committees.map(c => <CommitteeCard key={c.id} committee={c} />)}
      </div>
    </div>
  );
};
