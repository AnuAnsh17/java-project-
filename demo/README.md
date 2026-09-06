# Campus Connect — Standalone Presentation Demo

This directory contains a **standalone presentation React application** for **Campus Connect** ("Thakur Shree DPS College of Engineering and Management").

It allows complete, interactive demonstration of all Student, Faculty, and Admin features without requiring backend servers, database connections, or authentication credentials.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
cd demo
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open your browser at `http://localhost:3000` to view the presentation application.

---

## 🎓 Demo Features & Presentation Controls

### Role Switching Header
A persistent presentation bar is anchored at the top of the application screen. Use it to instantly switch between:
- 🎓 **Student Portal**
- 👨‍🏫 **Faculty Workspace**
- 🛠️ **Admin Control Center**
- 🏠 **Presentation Hub**

### Interactive Dummy Data
All user interactions (voting on posts, adding comments, creating assignments, grading submissions, taking attendance, joining clubs, registering for events, submitting complaints, adding/editing students or faculty in Admin, creating notices and elections) update local React state in real-time.

---

## 📁 Architecture Overview
- `src/data/initialDemoData.js`: Centralized, realistic Indian college demo dataset (@tsdcem.ac.in).
- `src/context/DemoContext.jsx`: Unified presentation state store and action handlers.
- `src/components/DemoHeaderBar.jsx`: Persistent presentation role-switching navigation bar.
- `src/pages/DemoRoleSelector.jsx`: Interactive entry point and role launcher.
- `src/student/`: Complete Student frontend pages and components.
- `src/faculty/`: Complete Faculty frontend pages and components.
- `src/admin/`: Complete Admin control center pages and components.
