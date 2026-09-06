import React, { useState, useEffect } from 'react';
import { reportService } from '../services/reportService';
import { ReportTable } from '../components/ReportTable';

export const ManageReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    async function load() {
      const rep = await reportService.getReports();
      setReports(rep);
    }
    load();
  }, []);

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>Reports & Complaints Management</h1>
          <p>Review student grievance submissions with respect for identity preferences</p>
        </div>
      </div>

      <ReportTable reports={reports} />
    </div>
  );
};
