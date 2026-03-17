/* ════════════════════════════════════════════════
   EduAI — AI Chat Assistant
   Stage 1 · Ministry of Education
   ════════════════════════════════════════════════ */

// ══ CHAT ══
function initChat(){
  const msgs=document.getElementById('chatMsgs'); msgs.innerHTML='';
  const nm=U.name?`, ${U.name.split(' ')[0]}`:'';
  addAI(`<strong style="font-size:14px;font-family:'Syne',sans-serif">Namaste${nm}! 🙏 I'm EduAI</strong>
  <div style="margin-top:6px;color:var(--t2);line-height:1.7;font-size:13px">Your personal guide for education schemes. I can find scholarships, explain eligibility, guide applications, and more.</div>
  <div class="cqr">
    <div class="cqb" onclick="sendQ('What scholarships can I apply for?')">🎓 Find my schemes</div>
    <div class="cqb" onclick="sendQ('NSP Post-Matric Scholarship details')">📖 NSP Scholarship</div>
    <div class="cqb" onclick="sendQ('How to get income certificate fast')">📄 Income cert</div>
    <div class="cqb" onclick="sendQ('JEE preparation tips')">📝 JEE tips</div>
  </div>`);
}
function chatKey(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();doSend();}}
function grow(el){el.style.height='auto';el.style.height=Math.min(el.scrollHeight,90)+'px';}
function sendQ(t){
  const c=document.getElementById('cinput');
  if(!chatReady){initChat();chatReady=true;}
  goPanel('chat');
  setTimeout(()=>{c.value=t;doSend();},50);
}
function doSend(){
  const el=document.getElementById('cinput');
  const t=el.value.trim(); if(!t) return;
  el.value=''; el.style.height='auto';
  addUser(t); showTyp();
  setTimeout(()=>{hideTyp();addAI(reply(t));},700+Math.random()*400);
}
let typEl=null;
function addUser(t){
  const r=document.createElement('div'); r.className='mr user';
  r.innerHTML=`<div class="mav u">${U.name?U.name.charAt(0).toUpperCase():'U'}</div><div><div class="mbub user">${esc(t)}</div><div class="mt">${now()}</div></div>`;
  document.getElementById('chatMsgs').appendChild(r); scrollChat();
}
function addAI(h){
  const r=document.createElement('div'); r.className='mr';
  r.innerHTML=`<div class="mav ai">🤖</div><div style="max-width:76%"><div class="mbub ai">${h}</div><div class="mt">${now()}</div></div>`;
  document.getElementById('chatMsgs').appendChild(r); scrollChat();
}
function showTyp(){typEl=document.createElement('div');typEl.className='tdots';typEl.innerHTML=`<div class="mav ai">🤖</div><div class="tdot-bub"><div class="td"></div><div class="td"></div><div class="td"></div></div>`;document.getElementById('chatMsgs').appendChild(typEl);scrollChat();}
function hideTyp(){if(typEl){typEl.remove();typEl=null;}}
function scrollChat(){const c=document.getElementById('chatMsgs');setTimeout(()=>{c.scrollTop=c.scrollHeight;},50);}
function esc(t){return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function now(){return new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});}

function reply(t){
  const l=t.toLowerCase();
  // Self-description → live match
  const selfMatch = l.match(/(i.?m|i am|my name|iam).{0,60}(obc|sc|st|general|ews|minority)/i)
    || (l.includes('income') && (l.includes('obc')||l.includes('sc')||l.includes('st')||l.includes('general')));
  if(selfMatch||/tell me.*(my|eligible|scheme.*for me|what.*i.*get)/i.test(t)){
    // parse inline
    const tempU = {...U};
    if(/obc/i.test(t)) tempU.cat='OBC';
    else if(/\bsc\b/i.test(t)) tempU.cat='SC';
    else if(/\bst\b/i.test(t)) tempU.cat='ST';
    else if(/ews/i.test(t)) tempU.cat='EWS';
    else if(/minority|muslim|christian|sikh|buddhist|jain/i.test(t)) tempU.cat='Minority (Muslim)';
    else if(/general/i.test(t)) tempU.cat='General';
    const mInc = t.match(/(\d+\.?\d*)\s*(l|lakh|lac)/i);
    if(mInc){const v=parseFloat(mInc[1]);if(v<1) tempU.inc='under1';else if(v<=2.5) tempU.inc='1to2.5';else if(v<=4.5) tempU.inc='2.5to4.5';else if(v<=8) tempU.inc='4.5to8';else tempU.inc='above8';}
    if(/btech|be\b|engineering/i.test(t)) tempU.edu='ug-tech';
    else if(/\bphd\b/i.test(t)) tempU.edu='phd';
    else if(/pg|postgrad|msc|mtech|ma\b/i.test(t)) tempU.edu='pg';
    else if(/\bba\b|\bbsc\b|undergrad|degree/i.test(t)) tempU.edu='ug-arts';
    else if(/class\s*11|class\s*12|12th|11th/i.test(t)) tempU.edu='11-12';
    if(/female|girl|woman|she\b/i.test(t)) tempU.gender='Female';
    else if(/male|boy|man\b|he\b/i.test(t)) tempU.gender='Male';
    const eligible=getEligibleSchemes(tempU);
    if(eligible.length===0){
      return `Based on what you've told me, I didn't find direct matches. This might be because:<br>
      ${!tempU.cat?'• <strong>Category not clear</strong> — mention OBC/SC/ST/General<br>':''}
      ${!tempU.edu?'• <strong>Education level not clear</strong> — mention class, BTech, etc.<br>':''}
      ${!tempU.inc?'• <strong>Income not mentioned</strong> — add annual family income<br>':''}
      <div class="cqr">
        <div class="cqb" onclick="goPanel('eligibility')">✅ Use Eligibility Checker</div>
        <div class="cqb" onclick="sendQ('What if I am General category student?')">General category</div>
      </div>`;
    }
    const top=eligible.slice(0,3);
    return `I found <strong>${eligible.length} eligible schemes</strong> for you! 🎉 Top matches:
    ${top.map(s=>`
    <div class="csc">
      <div class="csc-h"><div class="csc-name">${s.ico} ${s.name}</div><span style="font-size:11px;font-weight:700;padding:2px 7px;border-radius:8px;background:${bgMap[s.col]};color:${scoreColor(s.score)}">${s.score}%</span></div>
      <div class="csc-amt">${s.amt}</div>
      <div class="cebar"><div class="ceb"><div class="cebf" style="width:${s.score}%;background:${scoreColor(s.score)}"></div></div><div class="cepc" style="color:${scoreColor(s.score)}">${s.score}% match</div></div>
      <div style="font-size:11.5px;color:var(--gn);margin-bottom:7px">${s.reasons.slice(0,2).join(' · ')}</div>
      <div class="csc-btns">
        <button class="csc-bp" onclick="sendQ('How to apply for ${s.name}?')">📋 How to Apply</button>
        <button class="csc-bs" onclick="sendQ('${s.name} documents required')">📄 Docs</button>
      </div>
    </div>`).join('')}
    <div class="cqr"><div class="cqb" onclick="goPanel('eligibility')">🔍 Full analysis</div></div>`;
  }
  if(/^(hi|hello|hey|namaste|namaskar|hii+)/i.test(t)){
    const n=U.name?`, ${U.name.split(' ')[0]}`:'';
    return `Hey${n}! 👋 How can I help today?
    <div class="cqr">
      <div class="cqb" onclick="sendQ('What scholarships can I apply for?')">🎓 Find scholarships</div>
      <div class="cqb" onclick="sendQ('NSP scholarship details')">📖 NSP</div>
      <div class="cqb" onclick="sendQ('JEE 2026 preparation tips')">📝 JEE tips</div>
      <div class="cqb" onclick="sendQ('How to get income certificate?')">📄 Income cert</div>
    </div>`;
  }
  if(/thank/i.test(t)) return `You're most welcome! 😊 Best of luck with your applications! Remember — NSP deadline is <strong>October 31</strong>! 🎓`;
  if(/nsp|national scholarship.*portal|post.?matric/i.test(t)){
    return `<strong style="font-family:'Syne',sans-serif;font-size:14px">📖 NSP Post-Matric Scholarship</strong>
    <div style="font-size:11.5px;color:var(--t3);margin:3px 0 10px">Ministry of Education · scholarships.gov.in</div>
    <strong>💰 Amount:</strong> ₹2,000 – ₹25,000/year<br>
    <strong>✅ Who qualifies:</strong> OBC/SC/ST/EWS/Minority · Class 11 to PhD · Family income &lt;₹2.5 lakh<br>
    <strong>❌ Who doesn't:</strong> General (unreserved) category · Income above ₹2.5L
    <div class="csc">
      <div class="csc-h"><div class="csc-name">📋 Step-by-Step</div></div>
      <div class="csc-steps">
        <div class="csc-step"><div class="csc-sn">1</div><div class="csc-st">Go to <strong>scholarships.gov.in</strong> → New Registration → Enter Aadhaar</div></div>
        <div class="csc-step"><div class="csc-sn">2</div><div class="csc-st">Select your scheme → Fill academic details + bank account (for DBT)</div></div>
        <div class="csc-step"><div class="csc-sn">3</div><div class="csc-st">Upload: Aadhaar, Income Certificate, Caste Certificate, Marksheet, Bank Passbook</div></div>
        <div class="csc-step"><div class="csc-sn">4</div><div class="csc-st">College verifies online → Money sent directly to your account</div></div>
      </div>
      <div style="background:var(--rdl);border-radius:7px;padding:7px 10px;font-size:12px;color:var(--rd);font-weight:700;margin-bottom:7px">⏰ Deadline: October 31, 2025</div>
      <div class="csc-btns">
        <button class="csc-bp" onclick="sendQ('Income certificate for NSP how to get')">📄 Income cert help</button>
        <button class="csc-bs" onclick="sendQ('NSP scholarship renewal')">🔄 Renewal</button>
      </div>
    </div>`;
  }
  if(/aicte|pragati/i.test(t)){
    return `<strong style="font-family:'Syne',sans-serif;font-size:14px">🏛️ AICTE Pragati Scholarship</strong><br>
    <strong>👩 For:</strong> Girl students only in AICTE-approved technical courses<br>
    <strong>💰 Amount:</strong> ₹50,000/year<br>
    <strong>✅ Eligible:</strong> Female + BTech/BE/MCA/Pharmacy + Income &lt;₹8L<br>
    <strong>❌ Not eligible:</strong> Male students. BA/BSc students. Income above ₹8L<br><br>
    <strong>Apply:</strong> aicte-india.org → Select AICTE Pragati → Upload docs
    <div class="cqr"><div class="cqb" onclick="goPanel('eligibility')">Check my eligibility</div><div class="cqb" onclick="sendQ('AICTE Pragati documents list')">Documents needed</div></div>`;
  }
  if(/income.*cert|no.*income|certificate.*income/i.test(t)){
    return `<strong>📄 Get Income Certificate Fast</strong>
    <div class="csc"><div class="csc-steps">
      <div class="csc-step"><div class="csc-sn">1</div><div class="csc-st"><strong>Online (Fastest):</strong> Visit state portal — MahaOnline (MH), eSathi (UP), eDistrict.nic.in</div></div>
      <div class="csc-step"><div class="csc-sn">2</div><div class="csc-st"><strong>Offline:</strong> Nearest Tehsildar office / CSC (Jan Seva Kendra)</div></div>
      <div class="csc-step"><div class="csc-sn">3</div><div class="csc-st"><strong>Carry:</strong> Aadhaar card, Ration card, Salary slip (if available), Passport photo</div></div>
      <div class="csc-step"><div class="csc-sn">4</div><div class="csc-st"><strong>Time:</strong> 7–15 days. Get digital copy via DigiLocker in many states.</div></div>
    </div></div>
    <div style="background:var(--bll);border-radius:7px;padding:7px 10px;font-size:12px;color:var(--bl);font-weight:600">💡 Apply <strong>TODAY</strong> — it takes 7-15 days and NSP deadline is Oct 31!</div>
    <div class="cqr"><div class="cqb" onclick="sendQ('Caste certificate how to get?')">📜 Caste cert</div><div class="cqb" onclick="sendQ('NSP documents required')">NSP docs</div></div>`;
  }
  if(/caste.*cert|obc.*cert|sc.*cert|st.*cert|category.*cert/i.test(t)){
    return `<strong>📜 Get Caste Certificate</strong><br>Issued by Tehsildar/SDM office. Required for all reserved-category scholarships.
    <div class="csc"><div class="csc-steps">
      <div class="csc-step"><div class="csc-sn">1</div><div class="csc-st"><strong>Online:</strong> eDistrict.nic.in → your state → Apply for caste certificate</div></div>
      <div class="csc-step"><div class="csc-sn">2</div><div class="csc-st"><strong>Offline:</strong> Tehsildar office → Caste/SC/OBC certificate form → Rs 10–50 fee</div></div>
      <div class="csc-step"><div class="csc-sn">3</div><div class="csc-st"><strong>Carry:</strong> Aadhaar, Ration card, Father/Mother's caste proof, Affidavit</div></div>
      <div class="csc-step"><div class="csc-sn">4</div><div class="csc-st">Time: 7–21 days. Available digitally on DigiLocker once issued.</div></div>
    </div></div>`;
  }
  if(/girl|women|female|mahila|lady student/i.test(t)){
    return `<strong>👩 Schemes Exclusively for Girl Students</strong>
    <div class="csc"><div class="csc-h"><div class="csc-name">🏛️ AICTE Pragati</div><span class="badge b-gd">₹50,000/yr</span></div><div style="font-size:12px;color:var(--t2)">BTech/BE girls · Income &lt;₹8L · Any category · AICTE colleges</div></div>
    <div class="csc"><div class="csc-h"><div class="csc-name">👩‍🎓 Begum Hazrat Mahal</div><span class="badge b-gn">₹12,000/yr</span></div><div style="font-size:12px;color:var(--t2)">Minority girls only · Class 9–12 · 50%+ marks</div></div>
    <div class="csc"><div class="csc-h"><div class="csc-name">📖 NSP Post-Matric (Girls)</div><span class="badge b-sf">₹25,000/yr</span></div><div style="font-size:12px;color:var(--t2)">OBC/SC/ST/EWS/Minority girls · Class 11–PhD · Higher rates for girls</div></div>
    <div class="cqr"><div class="cqb" onclick="goPanel('eligibility')">Check my eligibility</div><div class="cqb" onclick="sendQ('AICTE Pragati application steps')">AICTE steps</div></div>`;
  }
  if(/fellowship|research|phd|ugc.*net|jrf|pmrf|csir/i.test(t)){
    return `<strong>🔬 Research Fellowships</strong>
    <div class="csc"><div class="csc-h"><div class="csc-name">🎓 PM Research Fellowship</div><span class="badge b-bl">₹70K–₹80K/mo</span></div><div style="font-size:12px;color:var(--t2)">PhD at IIT/NIT/IISc · CGPA ≥8.0 · Any category · pmrf.in</div></div>
    <div class="csc"><div class="csc-h"><div class="csc-name">🔬 CSIR-UGC NET JRF</div><span class="badge b-bl">₹37,000/mo</span></div><div style="font-size:12px;color:var(--t2)">Qualify NET/JRF exam · PG level · 5-year tenure · Any category</div></div>
    <div class="csc"><div class="csc-h"><div class="csc-name">☪️ Maulana Azad Fellowship</div><span class="badge b-gn">₹25K–₹28K/mo</span></div><div style="font-size:12px;color:var(--t2)">Minority students · MPhil/PhD only · No income limit</div></div>`;
  }
  if(/deadline|last.?date|when.*apply|expir/i.test(t)){
    return `📅 <strong>Current Scholarship Deadlines:</strong><br><br>
    🔴 <strong>NSP Post-Matric</strong> → <span style="color:var(--rd);font-weight:700">Oct 31 · 8 DAYS LEFT!</span><br>
    🟡 <strong>AICTE Pragati</strong> → <span style="color:var(--gd);font-weight:700">Nov 15 · 23 days</span><br>
    🟢 <strong>INSPIRE DST</strong> → <span style="color:var(--gn);font-weight:700">Nov 30 · 38 days</span><br>
    🟢 <strong>Central Sector</strong> → <span style="color:var(--gn);font-weight:700">Dec 15 · 53 days</span><br>
    🟢 <strong>CSIR-UGC JRF</strong> → <span style="color:var(--gn);font-weight:700">Dec 31 · 69 days</span>
    <div class="cqr"><div class="cqb" onclick="goPanel('deadlines')">📅 Full calendar</div><div class="cqb" onclick="sendQ('How to apply for NSP scholarship?')">Apply NSP</div></div>`;
  }
  if(/jee|neet|gate|cuet|cat\b|net\b.*exam|exam.*tip|preparation|study.*tip/i.test(t)){
    if(/jee/i.test(t)) return `<strong>📝 JEE Main 2026 — Preparation Tips</strong><br><br><strong>📅 Dates:</strong> Session 1: Jan 22–30, 2026 | Session 2: April 2026<br><strong>🔗 Register at:</strong> jeemain.nta.nic.in<br><br><strong>Key Topics to Focus:</strong><br>• <strong>Physics:</strong> Electrostatics, Modern Physics, Mechanics<br>• <strong>Maths:</strong> Calculus, Coordinate Geometry, Algebra<br>• <strong>Chemistry:</strong> Organic Chemistry (named reactions), Equilibrium<br><br><strong>📌 Strategy:</strong><br>• NCERT first — 80% questions are NCERT-based<br>• Previous years' papers (atleast 10 years)<br>• Mock tests every Sunday
    <div class="cqr"><div class="cqb" onclick="sendQ('Best books for JEE Main preparation')">📚 Best books</div><div class="cqb" onclick="sendQ('JEE Main syllabus important topics')">Syllabus</div></div>`;
    if(/neet/i.test(t)) return `<strong>📝 NEET UG 2026 Tips</strong><br><strong>Focus:</strong> Biology 360 marks (most important) → Physics 180 → Chemistry 180`;
    return `<strong>📝 Exam Preparation</strong><br><br>For JEE/NEET/GATE/NET tips, please check the <strong>Exam Calendar</strong> tab or ask specifically, e.g., "JEE Main tips" or "UGC NET preparation".
    <div class="cqr"><div class="cqb" onclick="goPanel('exams')">📅 Exam Calendar</div></div>`;
  }
  if(/general.*category|general.*student|no.*scholarship.*general|open.*category/i.test(t)){
    return `<strong>📚 Schemes for General Category Students</strong><br><br>General category has <strong>fewer income-based schemes</strong> but there are options:<br><br>
    ✅ <strong>Central Sector Scholarship</strong> — ₹20,000/yr if you were in top 12th rank in your state (any category eligible)<br>
    ✅ <strong>INSPIRE Scholarship</strong> — ₹80,000/yr if you're in BSc/MSc science and scored top 1% in Class 12<br>
    ✅ <strong>PMRF / JRF</strong> — ₹37K–₹80K/month for research (all categories, merit-based)<br>
    ✅ <strong>State-level schemes</strong> — Many states have their own merit scholarships for General<br><br>
    <strong>💡 Key insight:</strong> General category schemes are mostly <strong>merit-based, not income-based</strong>. Focus on high marks!
    <div class="cqr"><div class="cqb" onclick="goPanel('eligibility')">Check my eligibility</div><div class="cqb" onclick="sendQ('INSPIRE scholarship eligibility')">INSPIRE details</div></div>`;
  }
  return `I'm here to help! 😊 For "<em>${esc(t)}</em>":<br><br>Try describing yourself more specifically:
  <div style="background:var(--sfl);border-radius:9px;padding:10px 12px;margin:8px 0;font-size:12.5px;line-height:1.7">
    💡 Example: <em>"I'm 21, SC category from Bihar, doing BTech, family income 1.5 lakh per year"</em>
  </div>
  <div class="cqr">
    <div class="cqb" onclick="goPanel('eligibility')">✅ Eligibility checker</div>
    <div class="cqb" onclick="goPanel('schemes')">📚 Browse schemes</div>
    <div class="cqb" onclick="sendQ('NSP scholarship details')">📖 NSP</div>
    <div class="cqb" onclick="sendQ('Documents needed for scholarship')">📄 Documents</div>
  </div>`;
}

// ══ INIT ══
window.addEventListener('DOMContentLoaded',()=>{
  renderSchemes(); renderDeadlines();
  updateDashboard();
});
window.goPanel=goPanel; window.sendQ=sendQ; window.goApp=goApp; window.goLand=goLand;
window.filterSch=filterSch; window.renderCompare=renderCompare;


// ══════════════════════════════════════════════
