import React, { createContext, useContext, useState } from 'react';
import { initialDemoData } from '../data/initialDemoData';

const DemoContext = createContext(null);

export const DemoProvider = ({ children }) => {
  const [data, setData] = useState(initialDemoData);
  const [activeRole, setActiveRole] = useState('student'); // 'student' | 'faculty' | 'admin' | 'guest'

  const switchRole = (role) => {
    setActiveRole(role);
  };

  // Posts & Interactions
  const upvotePost = (postId) => {
    setData(prev => ({
      ...prev,
      posts: prev.posts.map(p => {
        if (p.id === postId) {
          const isUp = p.userVoted === 'up';
          return {
            ...p,
            upvotes: isUp ? p.upvotes - 1 : p.upvotes + 1,
            downvotes: p.userVoted === 'down' ? p.downvotes - 1 : p.downvotes,
            userVoted: isUp ? null : 'up'
          };
        }
        return p;
      })
    }));
  };

  const downvotePost = (postId) => {
    setData(prev => ({
      ...prev,
      posts: prev.posts.map(p => {
        if (p.id === postId) {
          const isDown = p.userVoted === 'down';
          return {
            ...p,
            downvotes: isDown ? p.downvotes - 1 : p.downvotes + 1,
            upvotes: p.userVoted === 'up' ? p.upvotes - 1 : p.upvotes,
            userVoted: isDown ? null : 'down'
          };
        }
        return p;
      })
    }));
  };

  const addComment = (postId, text) => {
    if (!text.trim()) return;
    const newComment = {
      id: `c-${Date.now()}`,
      author: data.currentStudent.name,
      time: "Just now",
      text
    };
    setData(prev => ({
      ...prev,
      posts: prev.posts.map(p => p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p)
    }));
  };

  const addPost = ({ title, category, content }) => {
    const newPost = {
      id: `post-${Date.now()}`,
      author: data.currentStudent.name,
      authorRole: `${data.currentStudent.department} • ${data.currentStudent.year}`,
      authorAvatar: data.currentStudent.avatar,
      time: "Just now",
      category,
      title,
      content,
      upvotes: 1,
      downvotes: 0,
      userVoted: 'up',
      comments: []
    };
    setData(prev => ({ ...prev, posts: [newPost, ...prev.posts] }));
  };

  // Clubs & Events
  const toggleClubMembership = (clubId) => {
    setData(prev => ({
      ...prev,
      clubs: prev.clubs.map(c => {
        if (c.id === clubId) {
          const newStatus = !c.isMember;
          return {
            ...c,
            isMember: newStatus,
            membersCount: newStatus ? c.membersCount + 1 : c.membersCount - 1
          };
        }
        return c;
      })
    }));
  };

  const registerEvent = (eventId) => {
    setData(prev => ({
      ...prev,
      events: prev.events.map(ev => {
        if (ev.id === eventId) {
          return {
            ...ev,
            isRegistered: true,
            registeredCount: ev.registeredCount + 1
          };
        }
        return ev;
      })
    }));
  };

  // Elections
  const voteInElection = (electionId, candidateId) => {
    setData(prev => ({
      ...prev,
      elections: prev.elections.map(el => {
        if (el.id === electionId) {
          return {
            ...el,
            userVoted: true,
            totalVotes: el.totalVotes + 1,
            candidates: el.candidates.map(c => c.id === candidateId ? { ...c, votes: c.votes + 1 } : c)
          };
        }
        return el;
      })
    }));
  };

  // Assignments & Submissions
  const createAssignment = (asgnData) => {
    const newAsgn = {
      id: `asgn-${Date.now()}`,
      ...asgnData,
      status: "Active",
      submissionsCount: 0
    };
    setData(prev => ({ ...prev, assignments: [newAsgn, ...prev.assignments] }));
  };

  const submitAssignment = (asgnId, fileName) => {
    const newSub = {
      id: `sub-${Date.now()}`,
      rollNo: data.currentStudent.rollNo,
      studentName: data.currentStudent.name,
      assignmentTitle: data.assignments.find(a => a.id === asgnId)?.title || "Course Assignment",
      submissionDate: new Date().toISOString().replace('T', ' ').slice(0, 16),
      fileName: fileName || `${data.currentStudent.rollNo}_Submission.zip`,
      status: "Submitted",
      marks: null,
      totalMarks: 20,
      feedback: ""
    };

    setData(prev => ({
      ...prev,
      submissions: [newSub, ...prev.submissions],
      assignments: prev.assignments.map(a => a.id === asgnId ? { ...a, status: "Submitted" } : a)
    }));
  };

  const gradeSubmission = (subId, marks, feedback) => {
    setData(prev => ({
      ...prev,
      submissions: prev.submissions.map(s => s.id === subId ? { ...s, marks: Number(marks), feedback, status: "Graded" } : s)
    }));
  };

  // Attendance
  const saveAttendanceRegister = ({ date, subject, targetClass, attendanceMap }) => {
    const presentCount = Object.values(attendanceMap).filter(val => val === 'Present').length;
    const totalCount = Object.keys(attendanceMap).length;
    const percentage = ((presentCount / (totalCount || 1)) * 100).toFixed(1);

    const newRecord = {
      id: `att-${Date.now()}`,
      date,
      subject,
      class: targetClass,
      presentCount,
      absentCount: totalCount - presentCount,
      totalCount,
      percentage: Number(percentage)
    };

    setData(prev => ({
      ...prev,
      attendance: {
        ...prev.attendance,
        history: [newRecord, ...prev.attendance.history]
      }
    }));
  };

  // Teams & Discussions
  const createTeam = (teamData) => {
    const newTeam = {
      id: `team-${Date.now()}`,
      ...teamData,
      faculty: data.currentFaculty.name,
      members: [
        { id: data.currentStudent.id, rollNo: data.currentStudent.rollNo, name: data.currentStudent.name, email: data.currentStudent.email }
      ],
      discussions: []
    };
    setData(prev => ({ ...prev, teams: [newTeam, ...prev.teams] }));
  };

  const postTeamDiscussion = (teamId, text) => {
    const newDisc = {
      id: `td-${Date.now()}`,
      author: activeRole === 'faculty' ? data.currentFaculty.name : data.currentStudent.name,
      time: "Just now",
      text
    };
    setData(prev => ({
      ...prev,
      teams: prev.teams.map(t => t.id === teamId ? { ...t, discussions: [...t.discussions, newDisc] } : t)
    }));
  };

  // Announcements
  const postAnnouncement = (annData) => {
    const newAnn = {
      id: `ann-${Date.now()}`,
      ...annData,
      date: new Date().toISOString().split('T')[0]
    };
    setData(prev => ({ ...prev, announcements: [newAnn, ...prev.announcements] }));
  };

  // Complaints
  const submitComplaint = ({ title, category, description, isAnonymous }) => {
    const newCmp = {
      id: `cmp-${Date.now()}`,
      title,
      category,
      description,
      date: new Date().toISOString().split('T')[0],
      submittedBy: isAnonymous ? "Anonymous Student" : data.currentStudent.name,
      isAnonymous,
      status: "Submitted / Under Review"
    };
    setData(prev => ({ ...prev, complaints: [newCmp, ...prev.complaints] }));
  };

  // Admin Mutations
  const addStudent = (studentObj) => {
    const newSt = {
      id: `st-${Date.now()}`,
      ...studentObj,
      attendancePercentage: 85.0,
      assignmentStatus: "Up-to-date",
      status: "Active"
    };
    setData(prev => ({ ...prev, students: [newSt, ...prev.students] }));
  };

  const addFaculty = (facObj) => {
    const newFac = {
      id: `fac-${Date.now()}`,
      ...facObj,
      subjectsCount: 1,
      classesCount: 1,
      status: "Active"
    };
    setData(prev => ({ ...prev, faculty: [newFac, ...prev.faculty] }));
  };

  const createClub = (clubObj) => {
    const newClub = {
      id: `club-${Date.now()}`,
      ...clubObj,
      membersCount: 1,
      isMember: false
    };
    setData(prev => ({ ...prev, clubs: [newClub, ...prev.clubs] }));
  };

  const createNotice = (noticeObj) => {
    const newNotice = {
      id: `not-${Date.now()}`,
      ...noticeObj,
      date: new Date().toISOString().split('T')[0],
      publisher: data.currentAdmin.name
    };
    setData(prev => ({ ...prev, notices: [newNotice, ...prev.notices] }));
  };

  const createElection = (elecObj) => {
    const newElec = {
      id: `el-${Date.now()}`,
      ...elecObj,
      status: "Active",
      totalVotes: 0,
      userVoted: false,
      candidates: []
    };
    setData(prev => ({ ...prev, elections: [newElec, ...prev.elections] }));
  };

  const resolveReport = (reportId) => {
    setData(prev => ({
      ...prev,
      reports: prev.reports.map(r => r.id === reportId ? { ...r, status: "Resolved" } : r)
    }));
  };

  const updateComplaintStatus = (complaintId, newStatus) => {
    setData(prev => ({
      ...prev,
      complaints: prev.complaints.map(c => c.id === complaintId ? { ...c, status: newStatus } : c)
    }));
  };

  return (
    <DemoContext.Provider value={{
      data,
      activeRole,
      switchRole,
      upvotePost,
      downvotePost,
      addComment,
      addPost,
      toggleClubMembership,
      registerEvent,
      voteInElection,
      createAssignment,
      submitAssignment,
      gradeSubmission,
      saveAttendanceRegister,
      createTeam,
      postTeamDiscussion,
      postAnnouncement,
      submitComplaint,
      addStudent,
      addFaculty,
      createClub,
      createNotice,
      createElection,
      resolveReport,
      updateComplaintStatus
    }}>
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
