/**
 * Campus Connect - Frontend Logic
 */

// --- DATA INITIALIZATION ---
const DEFAULT_CLUBS = [
    { id: 1, name: "Coding Club", desc: "Build cool software and compete in hackathons.", members: 24, icon: "bi-code-slash" },
    { id: 2, name: "Robotics Club", desc: "Design and build autonomous robots.", members: 18, icon: "bi-robot" },
    { id: 3, name: "Music Club", desc: "Jam sessions and college concerts.", members: 31, icon: "bi-music-note-beamed" },
    { id: 4, name: "Sports Club", desc: "Football, Cricket, and Athletics.", members: 45, icon: "bi-trophy" },
];

const DEFAULT_ELECTION = {
    name: "Student Council 2024",
    status: "NOT STARTED", // NOT STARTED, LIVE, ENDED
    candidates: [
        { id: 1, name: "Rahul Sharma", votes: 0 },
        { id: 2, name: "Priya Patil", votes: 0 },
        { id: 3, name: "Aditya Singh", votes: 0 }
    ]
};

// Storage Helpers
const getData = (key, defaultVal) => JSON.parse(localStorage.getItem(key)) || defaultVal;
const setData = (key, val) => localStorage.setItem(key, JSON.stringify(val));

// Initialize State
if (!localStorage.getItem('clubs')) setData('clubs', DEFAULT_CLUBS);
if (!localStorage.getItem('election')) setData('election', DEFAULT_ELECTION);
if (!localStorage.getItem('complaints')) setData('complaints', []);
if (!localStorage.getItem('userClubs')) setData('userClubs', []);
if (!localStorage.getItem('hasVoted')) setData('hasVoted', false);

// --- NAVIGATION LOGIC ---
function showSection(sectionId, element) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(s => s.classList.add('d-none'));
    // Show selected
    document.getElementById(`section-${sectionId}`).classList.remove('d-none');
    
    // Update active link
    if (element) {
        element.closest('.nav').querySelectorAll('.nav-link').forEach(l => {
            l.classList.remove('active', 'text-primary');
            l.classList.add('text-dark');
        });
        element.classList.add('active', 'text-primary');
        element.classList.remove('text-dark');
    }

    // Refresh data based on section
    refreshUIs();
}

// --- STUDENT PORTAL LOGIC ---

function refreshUIs() {
    const clubs = getData('clubs', []);
    const userClubs = getData('userClubs', []);
    const election = getData('election', {});
    const complaints = getData('complaints', []);
    const hasVoted = getData('hasVoted', false);

    // Update Dashboard Stats
    if(document.getElementById('stat-election-status')) {
        document.getElementById('stat-election-status').innerText = election.status;
        document.getElementById('stat-total-clubs').innerText = clubs.length;
        document.getElementById('stat-my-clubs').innerText = userClubs.length;
        document.getElementById('stat-complaints').innerText = complaints.length;
    }

    // Update Admin Stats
    if(document.getElementById('admin-stat-election')) {
        document.getElementById('admin-stat-election').innerText = election.status;
        document.getElementById('admin-stat-candidates').innerText = election.candidates.length;
        document.getElementById('admin-stat-clubs').innerText = clubs.length;
        document.getElementById('admin-stat-complaints').innerText = complaints.length;
    }

    renderClubs();
    renderElections();
    renderComplaints();
}

// Rendering Clubs
function renderClubs() {
    const container = document.getElementById('all-clubs-list');
    if (!container) return;

    const clubs = getData('clubs', []);
    const userClubs = getData('userClubs', []);

    container.innerHTML = clubs.map(club => {
        const isJoined = userClubs.includes(club.id);
        return `
            <div class="col-md-4">
                <div class="card h-100 border-0 shadow-sm p-3">
                    <div class="d-flex align-items-center mb-3">
                        <div class="bg-light p-2 rounded me-3 text-primary"><i class="bi ${club.icon} fs-4"></i></div>
                        <h5 class="mb-0 fw-bold">${club.name}</h5>
                    </div>
                    <p class="text-muted small flex-grow-1">${club.desc}</p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <span class="small text-secondary"><i class="bi bi-people me-1"></i> ${club.members} members</span>
                        ${isJoined 
                            ? `<span class="badge bg-success-subtle text-success">Member</span>`
                            : `<button class="btn btn-sm btn-outline-primary px-3 rounded-pill" onclick="joinClub(${club.id})">Join</button>`
                        }
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Update My Clubs Section
    const myContainer = document.getElementById('my-clubs-list');
    if (myContainer) {
        const joinedClubsData = clubs.filter(c => userClubs.includes(c.id));
        myContainer.innerHTML = joinedClubsData.length ? joinedClubsData.map(club => `
            <div class="col-md-6">
                <div class="card border-0 shadow-sm p-3">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h5 class="fw-bold">${club.name}</h5>
                            <p class="text-muted small">Joined recently</p>
                        </div>
                        <button class="btn btn-sm btn-outline-danger" onclick="confirmLeaveClub(${club.id}, '${club.name}')">Leave</button>
                    </div>
                </div>
            </div>
        `).join('') : `<div class="text-center py-5"><p class="text-muted">You haven't joined any clubs yet.</p></div>`;
    }

    // Update Complaints Dropdown
    const compSelect = document.getElementById('complaintClub');
    if (compSelect) {
        compSelect.innerHTML = `<option value="">Choose a club...</option>` + 
            clubs.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    }
}

// Join/Leave Club
function joinClub(id) {
    let userClubs = getData('userClubs', []);
    let clubs = getData('clubs', []);
    if (!userClubs.includes(id)) {
        userClubs.push(id);
        setData('userClubs', userClubs);
        // Increment count
        let idx = clubs.findIndex(c => c.id === id);
        clubs[idx].members++;
        setData('clubs', clubs);
        showAlert('Successfully joined the club!', 'success');
        refreshUIs();
    }
}

let clubToLeave = null;
function confirmLeaveClub(id, name) {
    clubToLeave = id;
    document.getElementById('leave-club-name').innerText = name;
    new bootstrap.Modal(document.getElementById('leaveClubModal')).show();
}

document.getElementById('confirmLeaveBtn')?.addEventListener('click', () => {
    let userClubs = getData('userClubs', []);
    let clubs = getData('clubs', []);
    userClubs = userClubs.filter(cid => cid !== clubToLeave);
    setData('userClubs', userClubs);
    
    let idx = clubs.findIndex(c => c.id === clubToLeave);
    if(idx > -1) clubs[idx].members--;
    setData('clubs', clubs);

    bootstrap.Modal.getInstance(document.getElementById('leaveClubModal')).hide();
    refreshUIs();
});

// Elections Voting
function renderElections() {
    const election = getData('election', {});
    const hasVoted = getData('hasVoted', false);
    const container = document.getElementById('candidate-list');
    if (!container) return;

    // Reset visibility
    document.getElementById('election-ui-active').classList.add('d-none');
    document.getElementById('election-ui-voted').classList.add('d-none');
    document.getElementById('election-ui-not-started').classList.add('d-none');

    if (election.status === "NOT STARTED") {
        document.getElementById('election-ui-not-started').classList.remove('d-none');
    } else if (hasVoted || election.status === "ENDED") {
        document.getElementById('election-ui-voted').classList.remove('d-none');
    } else {
        document.getElementById('election-ui-active').classList.remove('d-none');
        document.getElementById('current-election-name').innerText = election.name;
        container.innerHTML = election.candidates.map(cand => `
            <div class="col-md-4">
                <div class="card vote-card border-0 shadow-sm p-4 text-center">
                    <div class="mx-auto bg-light rounded-circle mb-3 d-flex align-items-center justify-content-center" style="width:70px; height:70px;">
                        <i class="bi bi-person-fill fs-2 text-primary"></i>
                    </div>
                    <h5 class="fw-bold">${cand.name}</h5>
                    <p class="small text-muted">Candidate</p>
                    <button class="btn btn-primary rounded-pill w-100 mt-2" onclick="openVoteModal(${cand.id}, '${cand.name}')">Vote</button>
                </div>
            </div>
        `).join('');
    }
}

let selectedCandidateId = null;
function openVoteModal(id, name) {
    selectedCandidateId = id;
    document.getElementById('vote-candidate-name').innerText = name;
    new bootstrap.Modal(document.getElementById('voteModal')).show();
}

document.getElementById('confirmVoteBtn')?.addEventListener('click', () => {
    let election = getData('election', {});
    let candIdx = election.candidates.findIndex(c => c.id === selectedCandidateId);
    if (candIdx > -1) {
        election.candidates[candIdx].votes++;
        setData('election', election);
        setData('hasVoted', true);
        bootstrap.Modal.getInstance(document.getElementById('voteModal')).hide();
        showAlert('Your vote has been submitted successfully.', 'success');
        refreshUIs();
    }
});

// Complaints
document.getElementById('complaintForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const clubId = parseInt(document.getElementById('complaintClub').value);
    const msg = document.getElementById('complaintMsg').value;
    const userClubs = getData('userClubs', []);

    if (!userClubs.includes(clubId)) {
        showAlert('You cannot complain about this club. You must first join the club.', 'danger');
        return;
    }

    const clubs = getData('clubs', []);
    const clubName = clubs.find(c => c.id === clubId).name;
    const complaints = getData('complaints', []);
    complaints.push({
        id: Date.now(),
        student: "Rahul Sharma",
        club: clubName,
        message: msg,
        status: "Pending"
    });
    setData('complaints', complaints);
    e.target.reset();
    showAlert('Complaint submitted successfully.', 'success');
    refreshUIs();
});

function renderComplaints() {
    const list = document.getElementById('my-complaints-history');
    if (!list) return;
    const comps = getData('complaints', []);
    list.innerHTML = comps.length ? comps.map(c => `
        <div class="card mb-3 border-0 bg-light p-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h6 class="fw-bold mb-0">${c.club}</h6>
                <span class="badge ${c.status === 'Pending' ? 'bg-warning' : 'bg-success'}">${c.status}</span>
            </div>
            <p class="small text-muted mb-0">${c.message}</p>
        </div>
    `).join('') : `<p class="text-muted">No complaints filed.</p>`;
}

// --- ADMIN PORTAL LOGIC ---

// Dynamic Candidate Inputs
function generateCandidateInputs() {
    const count = parseInt(document.getElementById('elCount').value);
    const container = document.getElementById('dynamic-candidates');
    container.innerHTML = "";
    for (let i = 1; i <= count; i++) {
        container.innerHTML += `
            <div class="mb-2">
                <input type="text" class="form-control cand-input" placeholder="Candidate ${i} Name" required>
            </div>
        `;
    }
}

// Create Election
document.getElementById('createElectionForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('elName').value;
    const inputs = document.querySelectorAll('.cand-input');
    const candidates = Array.from(inputs).map((input, index) => ({
        id: index + 1,
        name: input.value,
        votes: 0
    }));

    setData('election', { name, status: "NOT STARTED", candidates });
    setData('hasVoted', false);
    showAlert('New election created!', 'success');
    refreshUIs();
});

// Election Controls
document.getElementById('btnStartElection')?.addEventListener('click', () => {
    let el = getData('election', {});
    el.status = "LIVE";
    setData('election', el);
    refreshUIs();
});

document.getElementById('btnEndElection')?.addEventListener('click', () => {
    let el = getData('election', {});
    el.status = "ENDED";
    setData('election', el);
    refreshUIs();
});

// Create Club Admin
document.getElementById('createClubForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const clubs = getData('clubs', []);
    clubs.push({
        id: Date.now(),
        name: document.getElementById('clubName').value,
        desc: document.getElementById('clubDesc').value,
        icon: document.getElementById('clubIcon').value,
        members: 0
    });
    setData('clubs', clubs);
    e.target.reset();
    showAlert('Club created successfully!', 'success');
    refreshUIs();
});

// Admin View Management
function renderAdminTables() {
    const adminClubs = document.getElementById('admin-clubs-table');
    if (adminClubs) {
        const clubs = getData('clubs', []);
        adminClubs.innerHTML = clubs.map(c => `
            <tr>
                <td class="fw-bold">${c.name}</td>
                <td>${c.members}</td>
                <td><span class="badge bg-success">Active</span></td>
                <td><button class="btn btn-sm btn-light border">View</button></td>
            </tr>
        `).join('');
    }

    const adminComps = document.getElementById('admin-complaints-table');
    if (adminComps) {
        const comps = getData('complaints', []);
        adminComps.innerHTML = comps.map(c => `
            <tr>
                <td>${c.student}</td>
                <td>${c.club}</td>
                <td class="small">${c.message}</td>
                <td><span class="badge ${c.status === 'Pending' ? 'bg-warning' : 'bg-success'}">${c.status}</span></td>
                <td><button class="btn btn-sm btn-outline-primary" onclick="resolveComplaint(${c.id})">Resolve</button></td>
            </tr>
        `).join('');
    }

    const resultBox = document.getElementById('results-content');
    if(resultBox) {
        const el = getData('election', {});
        if(el.status !== "ENDED") {
            resultBox.innerHTML = `<div class="text-center py-4"><p class="text-muted">Results will be available once the election ends.</p></div>`;
        } else {
            const totalVotes = el.candidates.reduce((sum, c) => sum + c.votes, 0);
            const sorted = [...el.candidates].sort((a,b) => b.votes - a.votes);
            const winner = sorted[0];

            resultBox.innerHTML = `
                <div class="alert alert-success">Winner: <strong>${winner.name}</strong> with ${winner.votes} votes!</div>
                <table class="table align-middle">
                    <thead><tr><th>Candidate</th><th width="60%">Percentage</th><th>Votes</th></tr></thead>
                    <tbody>
                        ${el.candidates.map(c => {
                            const pct = totalVotes === 0 ? 0 : Math.round((c.votes / totalVotes) * 100);
                            return `
                            <tr>
                                <td>${c.name}</td>
                                <td>
                                    <div class="progress">
                                        <div class="progress-bar" style="width: ${pct}%"></div>
                                    </div>
                                </td>
                                <td><strong>${c.votes}</strong></td>
                            </tr>`;
                        }).join('')}
                    </tbody>
                </table>
                <div class="mt-3 text-center text-muted">Total Votes Polled: ${totalVotes}</div>
            `;
        }
    }
}

function resolveComplaint(id) {
    let comps = getData('complaints', []);
    let idx = comps.findIndex(c => c.id === id);
    if(idx > -1) {
        comps[idx].status = "Resolved";
        setData('complaints', comps);
        refreshUIs();
    }
}

// Helper: Simple Alert
function showAlert(msg, type) {
    const placeholder = document.getElementById('alertPlaceholder');
    if(!placeholder) return;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${msg}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    placeholder.append(wrapper);
    setTimeout(() => wrapper.remove(), 4000);
}

// Initialize components on load
document.addEventListener('DOMContentLoaded', () => {
    refreshUIs();
    // Wrap admin tables in the interval/refresh logic
    const adminCheck = setInterval(() => {
        if(document.getElementById('admin-clubs-table')) renderAdminTables();
    }, 500);
});