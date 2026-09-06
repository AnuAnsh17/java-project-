import React, { useState, useEffect } from 'react';
import { clubManagementService } from '../services/clubManagementService';
import { committeeManagementService } from '../services/committeeManagementService';
import { Building2, Briefcase } from 'lucide-react';

export const ManageOrganizations = () => {
  const [clubs, setClubs] = useState([]);
  const [committees, setCommittees] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    async function load() {
      const cl = await clubManagementService.getClubs();
      const comm = await committeeManagementService.getCommittees();
      setClubs(cl);
      setCommittees(comm);
    }
    load();
  }, []);

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>Organizations Overview</h1>
          <p>Unified administrative matrix of all campus clubs and formal committees</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {['All', 'Clubs', 'Committees'].map(tab => (
          <button
            key={tab}
            className={`btn ${filter === tab ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.35rem 1rem', fontSize: '0.85rem' }}
            onClick={() => setFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Organization Name</th>
              <th>Type</th>
              <th>Category</th>
              <th>Leader / Convenor</th>
              <th>Members</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {(filter === 'All' || filter === 'Clubs') && clubs.map(c => (
              <tr key={c.id}>
                <td style={{ fontWeight: '600', color: 'var(--primary-dark)' }}>{c.name}</td>
                <td><span className="badge badge-trust">Club</span></td>
                <td>{c.category}</td>
                <td>{c.leader}</td>
                <td>{c.membersCount}</td>
                <td><span className="status-badge status-active">{c.status}</span></td>
              </tr>
            ))}
            {(filter === 'All' || filter === 'Committees') && committees.map(cm => (
              <tr key={cm.id}>
                <td style={{ fontWeight: '600', color: 'var(--primary-dark)' }}>{cm.name}</td>
                <td><span className="badge badge-college">Committee</span></td>
                <td>{cm.category}</td>
                <td>{cm.leader}</td>
                <td>{cm.membersCount}</td>
                <td><span className="status-badge status-active">{cm.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
