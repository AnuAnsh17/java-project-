import React, { useState, useEffect } from 'react';
import { facultyManagementService } from '../services/facultyManagementService';
import { FacultyTable } from '../components/FacultyTable';
import { Search } from 'lucide-react';

export const ManageFaculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      const data = await facultyManagementService.getFaculty();
      setFaculty(data);
    }
    load();
  }, []);

  const handleToggleStatus = async (id) => {
    const updated = await facultyManagementService.toggleStatus(id);
    setFaculty(updated);
  };

  const filtered = faculty.filter(f => f.name.toLowerCase().includes(search.toLowerCase()) || f.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>Faculty Management</h1>
          <p>Institutional record of academic teaching staff and assigned course workloads</p>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search-wrapper">
          <Search size={16} className="admin-search-icon" />
          <input
            type="text"
            className="admin-search-input"
            placeholder="Search by faculty name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <FacultyTable faculty={filtered} onToggleStatus={handleToggleStatus} />
    </div>
  );
};
