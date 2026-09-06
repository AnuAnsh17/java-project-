import React, { useState, useEffect } from 'react';
import { noticeService } from '../services/noticeService';
import { NoticeCard } from '../components/NoticeCard';

export const Notices = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    async function load() {
      const n = await noticeService.getNotices();
      setNotices(n);
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

      <div>
        {notices.map(n => <NoticeCard key={n.id} notice={n} />)}
      </div>
    </div>
  );
};
