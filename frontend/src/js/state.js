/* ════════════════════════════════════════════════
   EduAI — App State & Constants
   Stage 1 · Ministry of Education
   ════════════════════════════════════════════════ */

// ══ STATE ══
const U = {name:'',age:'',gender:'',state:'',cat:'',edu:'',inc:'',marks:'',stream:''};
let mStep=1, mSels={}, chatReady=false, profileSet=false;

const colMap={sf:'b-sf',gn:'b-gn',bl:'b-bl',gd:'b-gd',pu:'b-pu',pk:'b-pk',rd:'b-rd'};
const bgMap={sf:'var(--sfl)',gn:'var(--gnl)',bl:'var(--bll)',gd:'var(--gdl)',pu:'var(--pul)',pk:'var(--pkl)',rd:'var(--rdl)'};

// Compute match score and return object
function scoreScheme(scheme, u){
  if(!u.cat&&!u.edu&&!u.inc) return {score:0,reasons:[],blocks:['Complete your profile to see match'],eligible:false};
  const result = scheme.eligFn(u);
  return {...result, eligible: result.blocks.length===0 && result.score>=30};
}

// Get eligible schemes sorted by score
function getEligibleSchemes(u){
  return SCHEMES.map(s=>({...s,...scoreScheme(s,u)}))
    .filter(s=>s.eligible)
    .sort((a,b)=>b.score-a.score);
}

// Bar color based on score
function scoreColor(s){
  if(s>=75) return 'var(--gn2)';
  if(s>=50) return 'var(--gd)';
  return 'var(--sf)';
}

