import React, { useState, useEffect } from 'react';
import { noticeService } from '../services/noticeService';
import { NoticeCard } from '../components/NoticeCard';
import { apiErrorMessage } from '../../services/api';

export const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setNotices(await noticeService.getNotices());
      } catch (requestError) {
        setError(apiErrorMessage(requestError, 'Notices could not be loaded.'));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>Official Notice Board</h1>
          <p>Verified circulars and academic announcements from college administration</p>
        </div>
      </div>

      {loading && <div className="student-card" role="status">Loading notices…</div>}
      {error && <div className="student-card" role="alert">{error}</div>}
      {!loading && !error && notices.length === 0 && <div className="student-card">There are no notices to show right now.</div>}
      <div>
        {notices.map(n => <NoticeCard key={n.id} notice={n} />)}
      </div>
    </div>
  );
};
