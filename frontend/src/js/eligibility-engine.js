/* ════════════════════════════════════════════════
   EduAI — Eligibility Engine & Scheme Database
   Stage 1 · Ministry of Education
   ════════════════════════════════════════════════ */

// ══════════════════════════════════════════════
//   REAL ELIGIBILITY ENGINE
//   Each scheme has explicit criteria functions
// ══════════════════════════════════════════════

// Income bracket comparison utility
const INC_ORDER = ['under1','1to2.5','2.5to4.5','4.5to8','above8'];
function incAtOrBelow(userInc, limit) {
  return INC_ORDER.indexOf(userInc) <= INC_ORDER.indexOf(limit);
}

// Education level groups
const EDU_PREMATRIC = ['9-10'];
const EDU_POSTMATRIC = ['11-12','diploma','ug-arts','ug-tech','ug-medical','pg','phd'];
const EDU_UG = ['ug-arts','ug-tech','ug-medical'];
const EDU_TECH = ['ug-tech'];
const EDU_SCIENCE = ['ug-arts','pg']; // arts includes science streams separately
const EDU_PG_ABOVE = ['pg','phd'];
const EDU_PHD = ['phd'];
const EDU_DIPLOMA = ['diploma'];
const EDU_11_12 = ['11-12'];

// North-east states
const NE_STATES = ['Arunachal Pradesh','Assam','Manipur','Meghalaya','Mizoram','Nagaland','Sikkim','Tripura'];

// Minority categories
const MINORITY_CATS = ['Minority','Minority (Muslim)','Minority (Christian)','Minority (Buddhist)','Minority (Jain)','Minority (Sikh)'];
const SC_CATS = ['SC'];
const ST_CATS = ['ST'];
const OBC_CATS = ['OBC'];
const RESERVED_CATS = ['OBC','SC','ST','EWS','Minority','Minority (Muslim)','Minority (Christian)','Minority (Buddhist)','Minority (Jain)','Minority (Sikh)'];

function isMinority(cat){ return MINORITY_CATS.includes(cat); }
function isSC(cat){ return SC_CATS.includes(cat); }
function isST(cat){ return ST_CATS.includes(cat); }
function isOBC(cat){ return OBC_CATS.includes(cat); }
function isReserved(cat){ return RESERVED_CATS.includes(cat); }
function isNorthEast(state){ return NE_STATES.includes(state); }

// ─── SCHEME DATABASE with eligibility functions ───
const SCHEMES = [
  {
    id:'nsp-postmatric',
    ico:'📖', col:'sf', type:'scholarship',
    name:'NSP Post-Matric Scholarship',
    by:'Ministry of Education',
    amt:'₹2,000–₹25,000/yr',
    amtNum: 25000,
    tags:['OBC/SC/ST/EWS/Minority','Income<₹2.5L','Class 11–PhD'],
    eligFn(u){
      let score=0, reasons=[], blocks=[];
      if(!isReserved(u.cat)){blocks.push('Only for reserved categories (OBC/SC/ST/EWS/Minority)'); return {score:0,reasons,blocks};}
      score+=40; reasons.push('✓ Category matches');
      if(EDU_POSTMATRIC.includes(u.edu)){score+=30;reasons.push('✓ Education level eligible (Class 11–PhD)');}
      else {blocks.push('Must be Class 11 or above'); return {score:0,reasons,blocks};}
      if(incAtOrBelow(u.inc,'1to2.5')){score+=30;reasons.push('✓ Income below ₹2.5L');}
      else if(incAtOrBelow(u.inc,'2.5to4.5')){score+=10;reasons.push('⚠ Income slightly above limit (₹2.5L)'); blocks.push('Income should be under ₹2.5L/year');}
      else{blocks.push('Income must be below ₹2.5L/year'); score=Math.max(0,score-10);}
      return {score:Math.min(score,100),reasons,blocks};
    }
  },
  {
    id:'central-sector',
    ico:'🌟', col:'sf', type:'scholarship',
    name:'Central Sector Scholarship',
    by:'Ministry of Education',
    amt:'₹10,000–₹20,000/yr',
    amtNum: 20000,
    tags:['All Categories','Top 12th Graders','Income<₹4.5L'],
    eligFn(u){
      let score=0, reasons=[], blocks=[];
      if(!EDU_UG.includes(u.edu)&&u.edu!=='pg'){blocks.push('Must be Undergraduate or Postgraduate'); return {score:0,reasons,blocks};}
      score+=30; reasons.push('✓ Education level (UG/PG)');
      if(incAtOrBelow(u.inc,'2.5to4.5')){score+=40;reasons.push('✓ Income below ₹4.5L');}
      else if(incAtOrBelow(u.inc,'4.5to8')){score+=20;reasons.push('⚠ Income slightly above limit');}
      else{blocks.push('Income must be below ₹4.5L/year'); return {score:0,reasons,blocks};}
      const marks=parseInt(u.marks)||0;
      if(marks>=80){score+=30;reasons.push('✓ Strong marks (≥80%) — likely top 12th grader');}
      else if(marks>=60){score+=15;reasons.push('⚠ Marks adequate but top 12th percentile preferred');}
      else{score+=5; reasons.push('⚠ Higher marks needed (top 12th rank in state)');}
      return {score:Math.min(score,100),reasons,blocks};
    }
  },
  {
    id:'aicte-pragati',
    ico:'🏛️', col:'gd', type:'grant',
    name:'AICTE Pragati Scholarship',
    by:'AICTE',
    amt:'₹50,000/yr',
    amtNum: 50000,
    tags:['Girl Students Only','Technical Courses','Income<₹8L'],
    eligFn(u){
      let score=0, reasons=[], blocks=[];
      if(u.gender!=='Female'){blocks.push('Only for female (girl) students'); return {score:0,reasons,blocks};}
      score+=35; reasons.push('✓ Female student');
      if(!EDU_TECH.includes(u.edu)){blocks.push('Must be in AICTE-approved technical course (BTech/BE/MCA/MBA/Pharmacy)'); return {score:0,reasons,blocks};}
      score+=35; reasons.push('✓ Technical course (BTech/BE)');
      if(incAtOrBelow(u.inc,'4.5to8')){score+=30;reasons.push('✓ Family income below ₹8L');}
      else{blocks.push('Income must be below ₹8L/year'); score+=10; reasons.push('⚠ Income limit ₹8L — check exact figure');}
      return {score:Math.min(score,100),reasons,blocks};
    }
  },
  {
    id:'inspire',
    ico:'🔭', col:'bl', type:'scholarship',
    name:'INSPIRE Scholarship (DST)',
    by:'Dept. of Science & Technology',
    amt:'₹80,000/yr',
    amtNum: 80000,
    tags:['Science Stream','Top 1% in Class 12','BSc/MSc Only'],
    eligFn(u){
      let score=0, reasons=[], blocks=[];
      const validEdu=['ug-arts','pg'];
      if(!validEdu.includes(u.edu)&&u.edu!=='11-12'){blocks.push('Only for BSc/MSc (not BTech) — science stream UG/PG'); return {score:0,reasons,blocks};}
      if(u.stream==='engineering'){blocks.push('Not for engineering students — BSc/MSc science only'); return {score:0,reasons,blocks};}
      if(u.stream==='science'||u.stream==='medical'){score+=40;reasons.push('✓ Science stream');}
      else{score+=10; reasons.push('⚠ Science stream preferred for INSPIRE');}
      const marks=parseInt(u.marks)||0;
      if(marks>=90){score+=40;reasons.push('✓ Excellent marks — likely in top 1%');}
      else if(marks>=80){score+=25;reasons.push('⚠ Good marks but top 1% in state board required');}
      else if(marks>=70){score+=10;reasons.push('⚠ Top 1% in state board required — marks may be insufficient');}
      else{blocks.push('Top 1% in state board required (typically 90%+)'); score=Math.max(score-10,0);}
      score+=20; reasons.push('✓ No income/category restriction');
      return {score:Math.min(score,100),reasons,blocks};
    }
  },
  {
    id:'ugc-jrf',
    ico:'🔬', col:'bl', type:'fellowship',
    name:'CSIR-UGC NET JRF',
    by:'UGC / CSIR',
    amt:'₹37,000/mo',
    amtNum: 444000,
    tags:['NET/JRF Qualified','Postgraduate','Research'],
    eligFn(u){
      let score=0, reasons=[], blocks=[];
      if(!EDU_PG_ABOVE.includes(u.edu)){blocks.push('Must be Postgraduate or PhD level'); return {score:0,reasons,blocks};}
      score+=50; reasons.push('✓ PG/PhD level');
      score+=30; reasons.push('✓ No income/category restriction');
      reasons.push('ℹ Must qualify UGC-NET/CSIR-NET exam for JRF');
      const marks=parseInt(u.marks)||0;
      if(marks>=60){score+=20;reasons.push('✓ Good marks — NET qualifying score typically 50-60%');}
      else{score+=5;}
      return {score:Math.min(score,100),reasons,blocks};
    }
  },
  {
    id:'begum-hazrat',
    ico:'👩‍🎓', col:'gn', type:'scholarship',
    name:'Begum Hazrat Mahal Scholarship',
    by:'Maulana Azad Education Foundation',
    amt:'₹5,000–₹12,000/yr',
    amtNum: 12000,
    tags:['Minority Girls Only','Class 9–12','50%+ Marks'],
    eligFn(u){
      let score=0, reasons=[], blocks=[];
      if(u.gender!=='Female'){blocks.push('Only for female students'); return {score:0,reasons,blocks};}
      if(!isMinority(u.cat)){blocks.push('Only for minority community (Muslim/Christian/Buddhist/Sikh/Jain/Parsi)'); return {score:0,reasons,blocks};}
      score+=40; reasons.push('✓ Minority female student');
      const validEdu=['9-10','11-12'];
      if(!validEdu.includes(u.edu)){blocks.push('Only for Class 9–12 students'); return {score:0,reasons,blocks};}
      score+=30; reasons.push('✓ Class 9–12');
      const marks=parseInt(u.marks)||0;
      if(marks>=50){score+=30;reasons.push('✓ Marks above 50%');}
      else if(marks>0){blocks.push('Minimum 50% marks required'); score+=5;}
      else{score+=15; reasons.push('ℹ 50%+ marks required — enter marks to verify');}
      return {score:Math.min(score,100),reasons,blocks};
    }
  },
  {
    id:'pmrf',
    ico:'🎓', col:'bl', type:'fellowship',
    name:'PM Research Fellowship (PMRF)',
    by:'Ministry of Education',
    amt:'₹70,000–₹80,000/mo',
    amtNum: 960000,
    tags:['PhD at IITs/IISc/NITs','CGPA ≥ 8.0','Any Category'],
    eligFn(u){
      let score=0, reasons=[], blocks=[];
      if(!EDU_PHD.includes(u.edu)&&!EDU_PG_ABOVE.includes(u.edu)){blocks.push('Only for PhD students or final year UG/PG transitioning to PhD'); return {score:0,reasons,blocks};}
      score+=40; reasons.push('✓ PhD/PG level eligible');
      const marks=parseInt(u.marks)||0;
      if(marks>=80){score+=40;reasons.push('✓ Strong marks — CGPA 8.0+ equivalent');}
      else if(marks>=70){score+=20;reasons.push('⚠ CGPA 8.0+ required — enter accurate marks');}
      else if(marks>0){score+=5;reasons.push('⚠ CGPA 8.0 (≈80%+) required');}
      score+=20; reasons.push('✓ No category/income restriction');
      reasons.push('ℹ Must join IIT/NIT/IISc for PhD');
      return {score:Math.min(score,100),reasons,blocks};
    }
  },
  {
    id:'aicte-saksham',
    ico:'♿', col:'pu', type:'grant',
    name:'AICTE Saksham Scholarship',
    by:'AICTE',
    amt:'₹30,000/yr',
    amtNum: 30000,
    tags:['Differently-Abled (40%+)','Technical Courses','Any Category'],
    eligFn(u){
      let score=0, reasons=[], blocks=[];
      if(!EDU_TECH.includes(u.edu)){blocks.push('Only for AICTE-approved technical courses (BTech/BE/MCA/Pharmacy)'); return {score:0,reasons,blocks};}
      score+=60; reasons.push('✓ Technical course');
      score+=40; reasons.push('ℹ For students with ≥40% disability — disability certificate required');
      return {score:Math.min(score,100),reasons,blocks};
    }
  },
  {
    id:'maulana-azad',
    ico:'☪️', col:'gn', type:'fellowship',
    name:'Maulana Azad National Fellowship',
    by:'Ministry of Minority Affairs',
    amt:'₹25,000–₹28,000/mo',
    amtNum: 336000,
    tags:['Minority Students Only','MPhil/PhD','No Income Limit'],
    eligFn(u){
      let score=0, reasons=[], blocks=[];
      if(!isMinority(u.cat)){blocks.push('Only for minority students (Muslim/Christian/Buddhist/Sikh/Jain/Parsi)'); return {score:0,reasons,blocks};}
      score+=50; reasons.push('✓ Minority community');
      if(EDU_PHD.includes(u.edu)||u.edu==='pg'){score+=50;reasons.push('✓ MPhil/PhD level');}
      else{blocks.push('Only for MPhil/PhD students'); return {score:0,reasons,blocks};}
      return {score:Math.min(score,100),reasons,blocks};
    }
  },
  {
    id:'nsp-prematric',
    ico:'📐', col:'sf', type:'scholarship',
    name:'NSP Pre-Matric Scholarship',
    by:'Ministry of Education',
    amt:'₹1,000–₹5,000/yr',
    amtNum: 5000,
    tags:['OBC/SC/ST/Minority','Class 9–10 Only','Income<₹2.5L'],
    eligFn(u){
      let score=0, reasons=[], blocks=[];
      if(!isReserved(u.cat)){blocks.push('Only for reserved categories (OBC/SC/ST/EWS/Minority)'); return {score:0,reasons,blocks};}
      score+=40; reasons.push('✓ Reserved category');
      if(!EDU_PREMATRIC.includes(u.edu)){blocks.push('Only for Class 9–10 students'); return {score:0,reasons,blocks};}
      score+=30; reasons.push('✓ Class 9–10');
      if(incAtOrBelow(u.inc,'1to2.5')){score+=30;reasons.push('✓ Income below ₹2.5L');}
      else{blocks.push('Income must be below ₹2.5L/year'); score+=5;}
      return {score:Math.min(score,100),reasons,blocks};
    }
  },
  {
    id:'ishan-uday',
    ico:'✈️', col:'bl', type:'scholarship',
    name:'Ishan Uday Scholarship',
    by:'UGC',
    amt:'₹5,400–₹7,800/mo',
    amtNum: 93600,
    tags:['North-East India ONLY','Undergraduate','Any Category'],
    eligFn(u){
      let score=0, reasons=[], blocks=[];
      if(!isNorthEast(u.state)){blocks.push('Only for students domiciled in North-East states'); return {score:0,reasons,blocks};}
      score+=60; reasons.push('✓ North-East state');
      if(EDU_UG.includes(u.edu)){score+=40;reasons.push('✓ Undergraduate level');}
      else{blocks.push('Only for Undergraduate students'); score+=10;}
      return {score:Math.min(score,100),reasons,blocks};
    }
  },
  {
    id:'pm-yasasvi',
    ico:'⭐', col:'gd', type:'scholarship',
    name:'PM-YASASVI Scholarship',
    by:'Ministry of Social Justice',
    amt:'₹75,000–₹1.25L/yr',
    amtNum: 125000,
    tags:['OBC/EBC/DNT Students','Class 9 to Degree','Exam-Based'],
    eligFn(u){
      let score=0, reasons=[], blocks=[];
      const validCats=['OBC','EWS'];
      if(!validCats.includes(u.cat)&&!u.cat.startsWith('OBC')){blocks.push('Only for OBC, EBC, DNT, NT, SNT communities'); return {score:0,reasons,blocks};}
      score+=40; reasons.push('✓ OBC/EBC community');
      if(incAtOrBelow(u.inc,'2.5to4.5')){score+=30;reasons.push('✓ Income within limit');}
      else{blocks.push('Income limit is ₹2.5L for Post-Matric variant'); score+=5;}
      score+=30; reasons.push('ℹ Selection via YASASVI exam conducted by NTA');
      return {score:Math.min(score,100),reasons,blocks};
    }
  },
];

