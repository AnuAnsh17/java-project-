import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { assignmentService } from '../services/assignmentService';
import { AssignmentCardFaculty } from '../components/AssignmentCard';
import { PlusCircle } from 'lucide-react';

export const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

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
          <h1>Course Assignments</h1>
          <p>Create, manage, and grade student assignments</p>
        </div>

        <button className="btn btn-primary" onClick={() => navigate('/faculty/assignments/create')}>
          <PlusCircle size={18} /> Create New Assignment
        </button>
      </div>

      <div className="grid-2">
        {assignments.map(a => <AssignmentCardFaculty key={a.id} assignment={a} />)}
      </div>
    </div>
  );
};
