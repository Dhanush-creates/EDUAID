/* ════════════════════════════════════════════════
   EduAI — Navigation & Page Routing
   Stage 1 · Ministry of Education
   ════════════════════════════════════════════════ */

// ══ PAGES ══
function goLand(){setPage('pg-land');}
function goApp(){
  setPage('pg-app');
  renderSchemes(); renderDeadlines();
  if(!chatReady){initChat();chatReady=true;}
  goPanel('dashboard');
  if(!profileSet) setTimeout(()=>document.getElementById('modal').classList.remove('hidden'),600);
}
function setPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

const pTitles={dashboard:'🏠 Dashboard',chat:'🤖 AI Assistant',eligibility:'✅ Eligibility Checker',schemes:'📚 All Schemes',deadlines:'📅 Deadlines',profile:'👤 My Profile',news:'🗞️ Education News',exams:'📝 Exam Calendar',calculator:'🧮 Scholarship Calculator',compare:'🏛️ College Compare'};
function goPanel(name){
  document.querySelectorAll('.ni').forEach(n=>n.classList.toggle('active',n.dataset.panel===name));
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
  const p=document.getElementById('pn-'+name);
  if(p) p.classList.add('active');
  document.getElementById('abTitle').textContent=pTitles[name]||'';
  setPage('pg-app');
  if(name==='compare'&&document.getElementById('comp-table').innerHTML==='') renderCompare();
}

