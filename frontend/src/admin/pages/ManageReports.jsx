import React, { useCallback, useEffect, useState } from 'react';
import { RefreshCw, Search } from 'lucide-react';
import { reportService } from '../services/reportService';
import { ReportTable } from '../components/ReportTable';
import { apiErrorMessage } from '../../services/api';

export const ManageReports = () => {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadReports = useCallback(async () => {
    setLoading(true);
    setError('');
    try { setReports(await reportService.getReports()); }
    catch (requestError) { setError(apiErrorMessage(requestError, 'Complaint records could not be loaded.')); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { loadReports(); }, [loadReports]);
  const filtered = reports.filter((report) => `${report.subject} ${report.category} ${report.status}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title"><h1>Reports & complaints</h1><p>Review campus reports and update their current status.</p></div>
      </div>
      <div className="admin-toolbar">
        <div className="admin-search-wrapper"><Search size={16} className="admin-search-icon" /><input className="admin-search-input" type="search" placeholder="Search reports by subject or status" value={search} onChange={(event) => setSearch(event.target.value)} /></div>
      </div>
      {error && <div className="student-card api-error-state" role="alert"><span>{error}</span><button className="btn btn-outline" onClick={loadReports}><RefreshCw size={15} /> Retry</button></div>}
      {loading && <div className="student-card" role="status">Loading complaint records…</div>}
      {!loading && !error && filtered.length > 0 && <ReportTable reports={filtered} />}
      {!loading && !error && filtered.length === 0 && <div className="student-card compact-empty">{search ? 'No reports match this search.' : 'No reports have been submitted.'}</div>}
    </div>
  );
};
