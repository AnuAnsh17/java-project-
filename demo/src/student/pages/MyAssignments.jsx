import React, { useState, useEffect } from 'react';
import { assignmentService } from '../services/assignmentService';
import { AssignmentCard } from '../components/AssignmentCard';

export const MyAssignments = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    async function load() {
      const asgns = await assignmentService.getAssignments();
      setAssignments(asgns);
    }
    load();
  }, []);

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>My Academic Assignments</h1>
          <p>Track course assignments, submission status, and faculty marks</p>
        </div>
      </div>

      <div className="grid-2">
        {assignments.map(a => <AssignmentCard key={a.id} assignment={a} />)}
      </div>
    </div>
  );
};
