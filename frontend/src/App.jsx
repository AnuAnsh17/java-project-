import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/context/AuthContext';
import { LandingPage } from './pages/LandingPage';
import { Login } from './auth/pages/Login';

// Student Module Layout & Pages
import { StudentLayout } from './student/pages/StudentLayout';
import { StudentDashboard } from './student/pages/StudentDashboard';
import { StudentProfile } from './student/pages/StudentProfile';
import { Feed } from './student/pages/Feed';
import { Forums } from './student/pages/Forums';
import { PostDetails } from './student/pages/PostDetails';
import { Clubs } from './student/pages/Clubs';
import { ClubDetails } from './student/pages/ClubDetails';
import { Committees } from './student/pages/Committees';
import { CommitteeDetails } from './student/pages/CommitteeDetails';
import { Events } from './student/pages/Events';
import { EventDetails } from './student/pages/EventDetails';
import { Notices } from './student/pages/Notices';
import { Elections } from './student/pages/Elections';
import { ElectionDetails } from './student/pages/ElectionDetails';
import { MyAssignments } from './student/pages/MyAssignments';
import { AssignmentDetails } from './student/pages/AssignmentDetails';
import { Attendance } from './student/pages/Attendance';
import { Teams } from './student/pages/Teams';
import { TeamDetails } from './student/pages/TeamDetails';
import { Complaints } from './student/pages/Complaints';
import { MyOrganizations } from './student/pages/MyOrganizations';
import { MyActivity } from './student/pages/MyActivity';

import './styles/global.css';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Landing & Authentication */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

          {/* Student Application Module Routes */}
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="feed" element={<Feed />} />
            <Route path="forums" element={<Forums />} />
            <Route path="forums/:id" element={<PostDetails />} />
            <Route path="clubs" element={<Clubs />} />
            <Route path="clubs/:id" element={<ClubDetails />} />
            <Route path="committees" element={<Committees />} />
            <Route path="committees/:id" element={<CommitteeDetails />} />
            <Route path="events" element={<Events />} />
            <Route path="events/:id" element={<EventDetails />} />
            <Route path="notices" element={<Notices />} />
            <Route path="elections" element={<Elections />} />
            <Route path="elections/:id" element={<ElectionDetails />} />
            <Route path="assignments" element={<MyAssignments />} />
            <Route path="assignments/:id" element={<AssignmentDetails />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="teams" element={<Teams />} />
            <Route path="teams/:id" element={<TeamDetails />} />
            <Route path="complaints" element={<Complaints />} />
            <Route path="organizations" element={<MyOrganizations />} />
            <Route path="activity" element={<MyActivity />} />
          </Route>

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
