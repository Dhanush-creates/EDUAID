/* ════════════════════════════════════════════════
   EduAI — Schemes · Deadlines · Calculator · Compare
   Stage 1 · Ministry of Education
   ════════════════════════════════════════════════ */

// ══ SCHEMES GRID ══
function renderSchemes(filter='all'){
  const grid=document.getElementById('schGrid'); if(!grid) return;
  const data=filter==='all'?SCHEMES:SCHEMES.filter(s=>{
    if(filter==='scholarship') return s.type==='scholarship';
    if(filter==='fellowship') return s.type==='fellowship';
    if(filter==='grant') return s.type==='grant';
    if(filter==='girls') return s.eligFn({gender:'Female',cat:'General',edu:'ug-tech',inc:'4.5to8',marks:'60',state:'Maharashtra',stream:'engineering'}).score>0;
    if(filter==='minority') return s.eligFn({gender:'Male',cat:'Minority (Muslim)',edu:'pg',inc:'1to2.5',marks:'70',state:'UP',stream:'science'}).score>0;
    if(filter==='technical') return ['aicte-pragati','aicte-saksham'].includes(s.id)||(s.eligFn({gender:'Male',cat:'OBC',edu:'ug-tech',inc:'1to2.5',marks:'70',state:'MH',stream:'engineering'}).score>0);
    if(filter==='research') return ['ugc-jrf','pmrf','maulana-azad'].includes(s.id);
    if(filter==='northeast') return s.id==='ishan-uday';
    if(filter==='disabled') return s.id==='aicte-saksham';
    return true;
  });
  document.getElementById('sch-count').textContent=data.length;
  if(data.length===0){grid.innerHTML=`<div class="no-schm"><div style="font-size:32px;margin-bottom:8px">🔍</div><div style="font-family:'Syne',sans-serif;font-size:14px;font-weight:700;margin-bottom:4px">No schemes in this filter</div></div>`;return;}
  // compute live scores if profile set
  grid.innerHTML=data.map(s=>{
    const sr=profileSet?scoreScheme(s,U):{score:0,eligible:false};
    const matchTxt=profileSet?(sr.eligible?`✓ ${sr.score}% match`:(sr.score>0?`⚠ ${sr.score}% partial`:'✗ Not eligible')):'Set profile to see match';
    const matchColor=profileSet?(sr.eligible?scoreColor(sr.score):(sr.score>0?'var(--gd)':'var(--t4)')):'var(--t4)';
    const matchW=profileSet?sr.score:0;
    return `<div class="fsc" onclick="sendQ('Tell me about ${s.name} — how to apply?');goPanel('chat')">
      <div class="fsc-top"><div class="fsc-ico" style="background:${bgMap[s.col]}">${s.ico}</div><div class="badge ${colMap[s.col]}">${s.type.toUpperCase()}</div></div>
      <div class="fsc-name">${s.name}</div>
      <div class="fsc-by">${s.by}</div>
      <div class="fsc-amt">${s.amt}</div>
      <div class="fsc-tags">${s.tags.map(t=>`<div class="fsc-tag">${t}</div>`).join('')}</div>
      <div class="fsc-mrow"><div class="fsc-mb"><div class="fsc-mf" style="width:${matchW}%;background:${matchColor}"></div></div><div class="fsc-mp" style="color:${matchColor}">${matchTxt}</div></div>
    </div>`;
  }).join('');
}
function filterSch(el,f){
  document.querySelectorAll('.fp').forEach(p=>p.classList.remove('active'));
  el.classList.add('active'); renderSchemes(f);
}

// ══ DEADLINES ══
const DL=[
  {day:'31',mon:'Oct',name:'NSP Post-Matric Scholarship',by:'Ministry of Education',amt:'₹25,000/yr',days:8,urg:true},
  {day:'15',mon:'Nov',name:'AICTE Pragati Scholarship',by:'AICTE',amt:'₹50,000/yr',days:23,urg:false},
  {day:'30',mon:'Nov',name:'INSPIRE Scholarship (DST)',by:'Dept. of Science & Tech.',amt:'₹80,000/yr',days:38,urg:false},
  {day:'15',mon:'Dec',name:'Central Sector Scholarship',by:'Ministry of Education',amt:'₹20,000/yr',days:53,urg:false},
  {day:'31',mon:'Dec',name:'CSIR-UGC JRF Fellowship',by:'UGC',amt:'₹37,000/mo',days:69,urg:false},
  {day:'31',mon:'Jan',name:'PM-YASASVI Scholarship',by:'Ministry of Social Justice',amt:'₹1.25L/yr',days:93,urg:false},
];
function renderDeadlines(){
  const el=document.getElementById('dlList'); if(!el) return;
  el.innerHTML=DL.map(d=>{
    const col=d.urg?'rd':d.days<30?'gd':'gn';
    return `<div class="dlfc" onclick="sendQ('How to apply for ${d.name}?');goPanel('chat')">
      <div class="dlfc-date" style="background:${bgMap[col]}"><div class="dlfc-day" style="color:var(--${col})">${d.day}</div><div class="dlfc-mon" style="color:var(--${col})">${d.mon}</div></div>
      <div><div class="dlfc-name">${d.name}</div><div class="dlfc-by">${d.by}</div><div class="dlfc-amt">${d.amt}</div></div>
      <div class="dlfc-pill" style="background:${bgMap[col]};color:var(--${col})">${d.urg?'⚡ URGENT — ':''}${d.days}d left</div>
    </div>`;
  }).join('');
}

// ══ SCHOLARSHIP CALCULATOR ══
function calcBenefit(){
  const dur=parseInt(document.getElementById('cc-dur').value);
  const cat=document.getElementById('cc-cat').value;
  const edu=document.getElementById('cc-edu').value;
  const inc=document.getElementById('cc-inc').value;
  const gen=document.getElementById('cc-gen').value;
  // Base annual amount by education
  const eduAmt={
    '11-12':10000,'ug':15000,'ug-tech':30000,'pg':25000,'phd':150000
  };
  const base=eduAmt[edu]||15000;
  // Multiplier by category
  const catMult={general:1.0,obc:1.4,sc:1.7,st:1.8,ews:1.5,minority:1.4};
  const mult=catMult[cat]||1.0;
  // Income boost
  const incBoost={under1:1.4,'1to2.5':1.3,'2.5to4.5':1.1,'4.5to8':0.9};
  const iboost=incBoost[inc]||1.0;
  // Gender bonus
  const genBoost=gen==='female'?1.25:1.0;
  const annual=Math.round(base*mult*iboost*genBoost/1000)*1000;
  const total=annual*dur;
  document.getElementById('calc-annual').textContent='₹'+annual.toLocaleString('en-IN');
  document.getElementById('calc-total').textContent=`₹${total.toLocaleString('en-IN')} over ${dur} year${dur>1?'s':''}`;
  // breakdown
  const schemes=[];
  if(cat!=='general'&&(inc==='under1'||inc==='1to2.5')) schemes.push({n:'NSP Scholarship',a:'₹25,000/yr',e:'Primary recommendation'});
  if(gen==='female'&&edu==='ug-tech') schemes.push({n:'AICTE Pragati',a:'₹50,000/yr',e:'Girl + Technical'});
  if(edu==='phd'||edu==='pg') schemes.push({n:'UGC JRF / PMRF',a:'₹37K–₹80K/mo',e:'Research fellowship'});
  if(['sc','st','obc','ews','minority'].includes(cat)) schemes.push({n:'Central Sector Scheme',a:'₹20,000/yr',e:'Reserved category'});
  document.getElementById('calc-breakdown').innerHTML=schemes.length>0?
    `<div style="font-size:12px;font-weight:700;color:var(--t2);margin-bottom:7px">Recommended schemes for you:</div>`+
    schemes.map(s=>`<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--bdr);font-size:12.5px"><span style="font-weight:600">${s.n}</span><span><strong style="color:var(--sf)">${s.a}</strong> · <span style="color:var(--t3)">${s.e}</span></span></div>`).join(''):'';
  document.getElementById('calc-result').classList.remove('hidden');
}
function calcLoan(){
  const fee=parseInt(document.getElementById('lc-fee').value)||100000;
  const sch=parseInt(document.getElementById('lc-sch').value)||25000;
  const rem=fee-sch;
  const loanInterest=rem*0.85*4*0.07;
  document.getElementById('loan-cards').innerHTML=`
    <div style="background:var(--gnl);border-radius:11px;padding:14px;text-align:center"><div style="font-size:11.5px;color:var(--gn);font-weight:700;margin-bottom:5px">With Scholarship</div><div style="font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:var(--gn)">₹${rem.toLocaleString('en-IN')}</div><div style="font-size:11px;color:var(--t3)">Out-of-pocket/year</div></div>
    <div style="background:var(--rdl);border-radius:11px;padding:14px;text-align:center"><div style="font-size:11.5px;color:var(--rd);font-weight:700;margin-bottom:5px">Without Scholarship</div><div style="font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:var(--rd)">₹${fee.toLocaleString('en-IN')}</div><div style="font-size:11px;color:var(--t3)">Full fee/year</div></div>
    <div style="background:var(--sfl);border-radius:11px;padding:14px;text-align:center;grid-column:span 2"><div style="font-size:11.5px;color:var(--sf);font-weight:700;margin-bottom:4px">Estimated Loan Interest Saved</div><div style="font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:var(--sf)">₹${Math.round(loanInterest).toLocaleString('en-IN')}</div><div style="font-size:11px;color:var(--t3)">Over 4 years at 7% interest</div></div>`;
  document.getElementById('loan-result').classList.remove('hidden');
}

// ══ COLLEGE COMPARE ══
const COLLEGES={
  iit:{headers:['Parameter','IIT Bombay','IIT Delhi'],rows:[
    ['NIRF Rank (2024)','3','2'],['BTech Avg Fees','₹2.2L/yr','₹2.0L/yr'],['Avg Package','₹21 LPA','₹20 LPA'],['Highest Package','₹3.67 Cr','₹2.5 Cr'],['Scholarships Avail.','SC/ST Free, PMRF','SC/ST Free, PMRF'],['Seats (BTech)','900+','850+'],['NIRF Innovation Rank','1','2'],
  ]},
  nit:{headers:['Parameter','NIT Trichy','NIT Warangal'],rows:[
    ['NIRF Rank (2024)','11','18'],['BTech Avg Fees','₹1.4L/yr','₹1.2L/yr'],['Avg Package','₹12 LPA','₹11 LPA'],['Highest Package','₹1.2 Cr','₹1.0 Cr'],['Scholarships Avail.','NSP, Central Sector','NSP, Central Sector'],['JEE Cutoff (General)','~1200','~2500'],
  ]},
  central:{headers:['Parameter','JNU Delhi','BHU Varanasi'],rows:[
    ['NIRF Rank (2024)','2 (Univ.)','5 (Univ.)'],['Avg Fees','₹400/sem','₹3,000/sem'],['Scholarship Avail.','NSP, JRF, PMRF','NSP, JRF, PMRF'],['Research Outlets','High','Very High'],['CUET Required','Yes','Yes'],['Hostel Facility','Yes','Yes'],
  ]},
  medical:{headers:['Parameter','AIIMS Delhi','JIPMER Pondicherry'],rows:[
    ['NIRF Rank (2024)','1 (Medical)','3 (Medical)'],['MBBS Fees','₹1,390/yr','₹5,000/yr'],['NEET Cutoff 2024','~50 rank','~200 rank'],['Stipend (Intern)','₹23,500/mo','₹18,000/mo'],['Scholarship Avail.','NSP, State Schemes','NSP, State Schemes'],
  ]},
  iim:{headers:['Parameter','IIM Ahmedabad','IIM Bangalore'],rows:[
    ['NIRF Rank (2024)','1 (Mgmt)','2 (Mgmt)'],['MBA Fees','₹34L total','₹32L total'],['Avg Package','₹33 LPA','₹32 LPA'],['Scholarship Avail.','Need-based grants','Need-based grants'],['CAT Cutoff','99.5%ile+','99%ile+'],
  ]},
};
function renderCompare(){
  const type=document.getElementById('comp-type')?.value||'iit';
  const data=COLLEGES[type];
  if(!data){document.getElementById('comp-table').innerHTML='';return;}
  let html=`<div class="ctable-h">${data.headers.map(h=>`<div class="cth">${h}</div>`).join('')}</div>`;
  html+=data.rows.map(r=>`<div class="ctr">${r.map((c,i)=>`<div class="ctd ${i===0?'attr':'val'}">${c}</div>`).join('')}</div>`).join('');
  document.getElementById('comp-table').innerHTML=html;
}

