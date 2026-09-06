import React, { useState, useEffect } from 'react';
import { classService } from '../services/classService';
import { ClassCard } from '../components/ClassCard';

export const MyClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    async function load() {
      const cls = await classService.getClasses();
      setClasses(cls);
    }
    load();
  }, []);

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>My Assigned Classes</h1>
          <p>Academic courses and assigned student divisions</p>
        </div>
      </div>

      <div className="grid-2">
        {classes.map(c => <ClassCard key={c.id} classItem={c} />)}
      </div>
    </div>
  );
};
