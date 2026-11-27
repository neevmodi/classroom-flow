import './style.css';
import './entry.css';

const assignments = [
  { id: 1, title: 'Linear equations practice', subject: 'Mathematics', due: 'Today, 5:00 PM', progress: 70, tag: 'In progress', color: 'purple' },
  { id: 2, title: 'Solar system research', subject: 'Science', due: 'Tomorrow', progress: 0, tag: 'To do', color: 'orange' },
  { id: 3, title: 'The Giver — chapter notes', subject: 'English', due: 'Dec 2', progress: 100, tag: 'Completed', color: 'green' },
  { id: 4, title: 'French vocabulary: food', subject: 'French', due: 'Dec 4', progress: 30, tag: 'In progress', color: 'blue' }
];

const students = [
  ['Aarav Sharma', 'AS', 94, 12, '#f1b56c'], ['Mia Williams', 'MW', 91, 11, '#ec8999'],
  ['Noah Brown', 'NB', 88, 10, '#79a6f5'], ['Sophia Chen', 'SC', 86, 10, '#a789e9'],
  ['Liam Jones', 'LJ', 82, 9, '#64c5ad'], ['Emma Davis', 'ED', 78, 9, '#f0a670']
];

let role = localStorage.getItem('flow-role') || 'student';
let accountType = localStorage.getItem('flow-account-type');
let institution = localStorage.getItem('flow-institution') || 'Northbridge College';
let activeNav = 'Overview';
let assignmentsState = [...assignments];

const icon = (name) => ({
  grid: '▦', book: '▤', chart: '◔', users: '♙', folder: '▱', settings: '⚙',
  bell: '♧', plus: '+', arrow: '→', check: '✓', calendar: '▣', clock: '◷',
  search: '⌕', chevron: '›', dots: '•••', target: '◎', spark: '✦', file: '▧'
}[name] || '•');

function initials(name) { return name.split(' ').map(x => x[0]).join(''); }
function avatar(name, color = '#8b7af2') { return `<span class="avatar" style="--av:${color}">${initials(name)}</span>`; }
function assignmentCard(a) {
  return `<article class="assignment-card">
    <div class="card-top"><span class="subject-dot ${a.color}"></span><span class="status ${a.tag.toLowerCase().replace(' ', '-')}">${a.tag}</span></div>
    <h3>${a.title}</h3><p>${a.subject}</p>
    <div class="progress-track"><i style="width:${a.progress}%"></i></div>
    <div class="card-foot"><span>${icon('calendar')} ${a.due}</span><strong>${a.progress}%</strong></div>
  </article>`;
}

function welcomeScreen() {
  return `<main class="welcome-shell"><section class="welcome-copy"><a class="brand" href="#"><span>✦</span> classroom<span>flow</span></a><div class="welcome-intro"><span class="eyebrow">ONE PLACE TO GROW</span><h1>Learning feels better when it flows.</h1><p>Bring your college community together — or build your own learning rhythm, one goal at a time.</p></div><div class="welcome-points"><span><b>✓</b> Focused workspaces for every institution</span><span><b>✓</b> Progress you can actually see</span><span><b>✓</b> Built for teachers and independent learners</span></div><p class="welcome-note">Your college’s classes, people, and work stay in its own workspace.</p></section><section class="welcome-panel"><div class="entry-card"><span class="eyebrow">WELCOME TO CLASSROOM FLOW</span><h2>How will you use Flow?</h2><p>Choose a space to get started. You can change this later.</p><button class="entry-option" data-entry="institution"><span class="entry-icon purple-bg">▦</span><span><strong>I’m joining a college</strong><small>Use your college email to enter its private workspace.</small></span><b>›</b></button><button class="entry-option" data-entry="personal"><span class="entry-icon orange-bg">✦</span><span><strong>I’m learning independently</strong><small>Plan goals, track habits, and own your progress.</small></span><b>›</b></button><small class="terms">By continuing, you agree to use Classroom Flow responsibly.</small></div></section></main>`;
}

function joinScreen(type) {
  const personal = type === 'personal';
  return `<main class="welcome-shell"><section class="welcome-copy"><a class="brand" href="#"><span>✦</span> classroom<span>flow</span></a><div class="welcome-intro"><span class="eyebrow">${personal ? 'YOUR PERSONAL SPACE' : 'YOUR COLLEGE WORKSPACE'}</span><h1>${personal ? 'Make progress on what matters to you.' : 'Everything your learning community needs.'}</h1><p>${personal ? 'Your goals, learning plans, and milestones — all in one focused private space.' : 'Enter your college email and we’ll connect you with the right people, classes, and resources.'}</p></div></section><section class="welcome-panel"><form class="entry-card" id="joinForm"><button class="back-link" type="button" id="backToWelcome">← Back</button><span class="eyebrow">${personal ? 'CREATE YOUR SPACE' : 'SIGN IN TO YOUR COLLEGE'}</span><h2>${personal ? 'Start your learning journey' : 'Find your workspace'}</h2><p>${personal ? 'No classroom required. Start with a goal today.' : 'Use the email address given to you by your college.'}</p>${personal ? '<label>Your name<input id="nameInput" required placeholder="e.g. Jordan Lee"></label><label>Email address<input id="emailInput" type="email" required placeholder="you@example.com"></label>' : '<label>College email<input id="emailInput" type="email" required placeholder="you@northbridge.edu"></label><label>Choose a demo college<select id="institutionInput"><option>Northbridge College</option><option>Riverside Institute</option><option>Westfield Academy</option></select></label>'}<label>I am a<select id="roleInput"><option value="student">Student / learner</option><option value="teacher">Teacher / mentor</option></select></label><button class="primary-btn wide" type="submit">${personal ? 'Create my space' : 'Continue to workspace'} ${icon('arrow')}</button><small class="terms">Demo mode: this is a front-end preview and does not send or store your email.</small></form></section></main>`;
}

function sidebar() {
  const studentNav = [['Overview','grid'],['My work','book'],['Progress','chart'],['Leaderboard','target'],['Resources','folder']];
  const teacherNav = [['Overview','grid'],['Assignments','book'],['Students','users'],['Progress','chart'],['Resources','folder']];
  const items = role === 'student' ? studentNav : teacherNav;
  return `<aside class="sidebar">
    <a class="brand" href="#"><span>✦</span> classroom<span>flow</span></a><div class="workspace-badge"><span>${accountType === 'personal' ? '✦' : '▦'}</span><div><b>${accountType === 'personal' ? 'Personal space' : institution}</b><small>${accountType === 'personal' ? 'Independent learner' : 'College workspace'}</small></div></div>
    <nav>${items.map(([label, i]) => `<button class="nav-item ${activeNav === label ? 'active' : ''}" data-nav="${label}"><b>${icon(i)}</b>${label}</button>`).join('')}</nav>
    <div class="sidebar-bottom"><button class="nav-item"><b>${icon('settings')}</b>Settings</button>
      <div class="help-card"><span>✦</span><strong>Need a hand?</strong><p>Visit our help centre for quick answers.</p><a href="#">Get help ${icon('arrow')}</a></div>
      <button class="profile-mini">${avatar(role === 'student' ? 'Alex Johnson' : 'Olivia Martin', role === 'student' ? '#75a9ed' : '#ac7bdc')}<span><strong>${role === 'student' ? 'Alex Johnson' : 'Olivia Martin'}</strong><small>${role === 'student' ? 'Student' : 'Teacher'}</small></span><i>⌄</i></button>
    </div>
  </aside>`;
}

function topbar() {
  return `<header class="topbar"><div class="crumb"><span>${accountType === 'personal' ? 'Personal space' : institution}</span><b>/</b><strong>${activeNav}</strong></div>
  <div class="top-actions"><button class="role-switch" id="roleSwitch">${role === 'student' ? 'Switch to teacher view' : 'Switch to student view'}</button><button class="logout-btn" id="logout">Exit demo</button><button class="icon-btn">${icon('bell')}<i></i></button>${avatar(role === 'student' ? 'Alex Johnson' : 'Olivia Martin', role === 'student' ? '#75a9ed' : '#ac7bdc')}</div></header>`;
}

function studentOverview() {
  const next = assignmentsState.filter(a => a.progress < 100);
  return `<main class="content"><section class="hero"><div><span class="eyebrow">FRIDAY, NOVEMBER 27</span><h1>Good morning, Alex <span>✦</span></h1><p>Ready to make today count? You have <b>${next.length} tasks</b> waiting for you.</p></div><div class="streak"><span>🔥</span><div><strong>8 day streak</strong><small>Keep it going!</small></div></div></section>
  <section class="stats-grid"><div class="stat-card purple-bg"><span>${icon('file')}</span><div><small>To do</small><strong>${assignmentsState.filter(a=>a.progress===0).length}</strong><p>New this week</p></div></div><div class="stat-card orange-bg"><span>${icon('clock')}</span><div><small>In progress</small><strong>${assignmentsState.filter(a=>a.progress>0&&a.progress<100).length}</strong><p>Keep moving forward</p></div></div><div class="stat-card green-bg"><span>${icon('check')}</span><div><small>Completed</small><strong>${assignmentsState.filter(a=>a.progress===100).length}</strong><p>Great work, Alex!</p></div></div><div class="stat-card blue-bg"><span>${icon('chart')}</span><div><small>Average score</small><strong>87<span>%</span></strong><p class="up">↑ 6% from last week</p></div></div></section>
  <section class="split"><div class="panel assignments"><div class="panel-head"><div><h2>Continue learning</h2><p>Pick up right where you left off.</p></div><button class="text-btn" data-nav="My work">View all ${icon('arrow')}</button></div><div class="assignment-list">${next.slice(0,3).map(assignmentCard).join('')}</div></div>
  <div class="panel schedule"><div class="panel-head"><div><h2>Upcoming</h2><p>Your week at a glance.</p></div><button class="dots">${icon('dots')}</button></div><div class="date-row"><b>27</b><span>Nov</span><i>28</i><i>29</i><i>30</i><i>1</i></div><div class="event"><span class="event-dot purple"></span><div><strong>Linear equations practice</strong><small>Due today · 5:00 PM</small></div></div><div class="event"><span class="event-dot orange"></span><div><strong>Solar system research</strong><small>Science · Tomorrow</small></div></div><button class="outline-btn">${icon('calendar')} Open calendar</button></div></section>
  <section class="panel leaderboard"><div class="panel-head"><div><h2>Class leaderboard</h2><p>Celebrate the effort — every step matters.</p></div><button class="text-btn" data-nav="Leaderboard">See leaderboard ${icon('arrow')}</button></div><div class="leader-row podium"><span class="rank gold">1</span>${avatar('Aarav Sharma','#efb46d')}<strong>Aarav Sharma</strong><span class="bar"><i style="width:94%"></i></span><b>94 pts</b></div><div class="leader-row"><span class="rank">2</span>${avatar('Mia Williams','#e990a0')}<strong>Mia Williams</strong><span class="bar"><i style="width:91%"></i></span><b>91 pts</b></div><div class="leader-row yours"><span class="rank">3</span>${avatar('Alex Johnson','#75a9ed')}<strong>You</strong><span class="bar"><i style="width:87%"></i></span><b>87 pts</b></div></section></main>`;
}

function teacherOverview() {
  const activity = [['Mia Williams','Completed “Linear equations practice”','8 min ago','#ec8999'],['Noah Brown','Submitted “Solar system research”','23 min ago','#79a6f5'],['Sophia Chen','Scored 96% on the vocabulary quiz','1 hr ago','#a789e9'],['Aarav Sharma','Started “The Giver — chapter notes”','2 hrs ago','#f1b56c']];
  return `<main class="content"><section class="hero teacher-hero"><div><span class="eyebrow">FRIDAY, NOVEMBER 27</span><h1>Good morning, Olivia <span>✦</span></h1><p>Here’s how your classes are moving today.</p></div><button class="primary-btn" id="openModal">${icon('plus')} Create assignment</button></section>
  <section class="stats-grid teacher-stats"><div class="stat-card purple-bg"><span>${icon('users')}</span><div><small>Students</small><strong>28</strong><p>Across 3 classes</p></div></div><div class="stat-card blue-bg"><span>${icon('file')}</span><div><small>Active assignments</small><strong>8</strong><p>2 due this week</p></div></div><div class="stat-card green-bg"><span>${icon('check')}</span><div><small>Completion rate</small><strong>84<span>%</span></strong><p class="up">↑ 8% this month</p></div></div><div class="stat-card orange-bg"><span>${icon('chart')}</span><div><small>Class average</small><strong>82<span>%</span></strong><p>+4 pts from last week</p></div></div></section>
  <section class="split teacher-split"><div class="panel activity"><div class="panel-head"><div><h2>Recent activity</h2><p>What your students are up to.</p></div><button class="dots">${icon('dots')}</button></div>${activity.map(a=>`<div class="activity-row">${avatar(a[0],a[3])}<div><strong>${a[0]}</strong><p>${a[1]}</p></div><time>${a[2]}</time></div>`).join('')}<button class="outline-btn">View all activity ${icon('arrow')}</button></div>
  <div class="panel class-progress"><div class="panel-head"><div><h2>Class progress</h2><p>Year 9 · Mathematics</p></div><button class="dots">${icon('dots')}</button></div><div class="ring-wrap"><div class="ring"><strong>84%</strong><span>complete</span></div><div><b>Great momentum!</b><p>23 of 28 students are on track with this week’s work.</p><button class="text-btn">View student progress ${icon('arrow')}</button></div></div><div class="mini-metrics"><div><b>5</b><span>Need support</span></div><div><b>23</b><span>On track</span></div><div><b>4</b><span>Top performers</span></div></div></div></section>
  <section class="panel upcoming-table"><div class="panel-head"><div><h2>Assignments to review</h2><p>Submissions needing your attention.</p></div><button class="text-btn" data-nav="Assignments">View assignments ${icon('arrow')}</button></div><div class="table-head"><span>ASSIGNMENT</span><span>CLASS</span><span>SUBMITTED</span><span>PROGRESS</span></div>${assignmentsState.slice(0,3).map((a,i)=>`<div class="table-row"><div><span class="subject-dot ${a.color}"></span><strong>${a.title}</strong></div><span>Year 9 ${i ? 'B' : 'A'}</span><span>${12-i*3}/28</span><div class="table-progress"><i style="width:${70-i*13}%"></i><b>${70-i*13}%</b></div></div>`).join('')}</section></main>`;
}

function genericPage() {
  const isTeacher = role === 'teacher';
  const label = activeNav;
  if (label === 'Leaderboard') return `<main class="content simple"><div class="page-title"><span class="eyebrow">YEAR 9 · THIS MONTH</span><h1>Leaderboard</h1><p>Recognition for consistency, curiosity, and showing up.</p></div><section class="panel leaderboard full">${students.map((s,i)=>`<div class="leader-row ${i===2?'yours':''}"><span class="rank ${i===0?'gold':''}">${i+1}</span>${avatar(s[0],s[4])}<strong>${s[0]}</strong><span class="bar"><i style="width:${s[2]}%"></i></span><b>${s[2]} pts</b><small>${s[3]} tasks done</small></div>`).join('')}</section></main>`;
  if (label === 'Students') return `<main class="content simple"><div class="page-title"><span class="eyebrow">YEAR 9 · MATHEMATICS</span><h1>Students</h1><p>See who is thriving and where a little support can help.</p></div><section class="panel student-table"><div class="table-head"><span>STUDENT</span><span>COMPLETED</span><span>AVERAGE</span><span>STATUS</span></div>${students.map(s=>`<div class="table-row"><div>${avatar(s[0],s[4])}<strong>${s[0]}</strong></div><span>${s[3]}/12 tasks</span><span>${s[2]}%</span><span class="status ${s[2]>85?'completed':'in-progress'}">${s[2]>85?'On track':'Needs support'}</span></div>`).join('')}</section></main>`;
  const list = isTeacher ? assignmentsState : assignmentsState;
  return `<main class="content simple"><div class="page-title"><span class="eyebrow">${isTeacher ? 'MANAGE YOUR CLASS' : 'STAY ON TOP OF IT'}</span><h1>${label}</h1><p>${isTeacher ? 'Create focused work and keep every learner moving forward.' : 'Everything you need to do, in one calm place.'}</p>${isTeacher && label==='Assignments'?'<button class="primary-btn" id="openModal">+ Create assignment</button>':''}</div><section class="work-grid">${list.map(assignmentCard).join('')}</section></main>`;
}

function modal() { return `<div class="modal-backdrop" id="modal"><form class="modal"><button type="button" class="close" id="closeModal">×</button><span class="eyebrow">NEW ASSIGNMENT</span><h2>Create something meaningful</h2><label>Assignment title<input required id="assignmentTitle" placeholder="e.g. Fractions revision worksheet"></label><label>Subject<select id="assignmentSubject"><option>Mathematics</option><option>Science</option><option>English</option><option>French</option></select></label><label>Due date<input id="assignmentDue" type="date" required></label><button class="primary-btn" type="submit">Create assignment ${icon('arrow')}</button></form></div>`; }

function render() {
  if (!accountType) {
    document.querySelector('#app').innerHTML = welcomeScreen();
    bindWelcome();
    return;
  }
  const overview = activeNav === 'Overview';
  document.querySelector('#app').innerHTML = `<div class="app-shell">${sidebar()}<div class="main-area">${topbar()}${overview ? (role === 'student' ? studentOverview() : teacherOverview()) : genericPage()}</div></div>`;
  bind();
}
function bind() {
  document.querySelectorAll('[data-nav]').forEach(el => el.addEventListener('click', () => { activeNav = el.dataset.nav; render(); }));
  document.querySelector('#roleSwitch').onclick = () => { role = role === 'student' ? 'teacher' : 'student'; localStorage.setItem('flow-role', role); activeNav = 'Overview'; render(); };
  document.querySelector('#logout').onclick = () => { localStorage.removeItem('flow-account-type'); accountType = null; render(); };
  document.querySelectorAll('#openModal').forEach(b=>b.onclick=()=>{ document.body.insertAdjacentHTML('beforeend',modal()); bindModal(); });
}
function bindWelcome() {
  document.querySelectorAll('[data-entry]').forEach(button => button.onclick = () => { document.querySelector('#app').innerHTML = joinScreen(button.dataset.entry); bindJoin(button.dataset.entry); });
}
function bindJoin(type) {
  document.querySelector('#backToWelcome').onclick = () => render();
  document.querySelector('#joinForm').onsubmit = event => {
    event.preventDefault();
    accountType = type;
    role = document.querySelector('#roleInput').value;
    institution = type === 'personal' ? 'My learning space' : document.querySelector('#institutionInput').value;
    localStorage.setItem('flow-account-type', accountType);
    localStorage.setItem('flow-role', role);
    localStorage.setItem('flow-institution', institution);
    activeNav = 'Overview';
    render();
  };
}
function bindModal() { const m=document.querySelector('#modal'); document.querySelector('#closeModal').onclick=()=>m.remove(); m.onclick=e=>{if(e.target===m)m.remove()}; m.querySelector('form').onsubmit=e=>{e.preventDefault(); const title=document.querySelector('#assignmentTitle').value; const subject=document.querySelector('#assignmentSubject').value; const due=new Date(document.querySelector('#assignmentDue').value).toLocaleDateString('en-US',{month:'short',day:'numeric'}); assignmentsState.unshift({id:Date.now(),title,subject,due,progress:0,tag:'To do',color:'purple'}); m.remove(); activeNav='Assignments'; render();}; }
render();
