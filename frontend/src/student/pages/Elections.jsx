import React, { useState, useEffect } from 'react';
import { electionService } from '../services/electionService';
import { ElectionCard } from '../components/ElectionCard';

export const Elections = () => {
  const [elections, setElections] = useState([]);

  useEffect(() => {
    async function load() {
      const el = await electionService.getElections();
      setElections(el);
    }
    load();
  }, []);

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>Online Campus Elections</h1>
          <p>Transparent digital voting for Student Council & organizational leadership</p>
        </div>
      </div>

      <div className="grid-2">
        {elections.map(el => <ElectionCard key={el.id} election={el} />)}
      </div>
    </div>
  );
};
