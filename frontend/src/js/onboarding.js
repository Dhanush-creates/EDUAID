/* ════════════════════════════════════════════════
   EduAI — Onboarding Modal
   Stage 1 · Ministry of Education
   ════════════════════════════════════════════════ */

// ══ ONBOARDING ══
const mMeta=[
  {ico:'👋',h:'Welcome to EduAI!',sub:'A few details so we can find your exact eligible schemes.'},
  {ico:'🗺️',h:'Where are you from?',sub:'Helps find state-specific + Central schemes.'},
  {ico:'🎓',h:'Your education?',sub:'Different levels have different eligible schemes.'},
  {ico:'💰',h:'Family income?',sub:'Many schemes are income-based. Your data stays private.'},
];
function updModal(){
  const m=mMeta[mStep-1];
  document.getElementById('m-ico').textContent=m.ico;
  document.getElementById('m-h').textContent=m.h;
  document.getElementById('m-sub').textContent=m.sub;
  document.querySelectorAll('.md-step').forEach((s,i)=>s.classList.toggle('active',i+1===mStep));
  document.querySelectorAll('.md-dot').forEach((d,i)=>d.classList.toggle('active',i+1===mStep));
  document.getElementById('m-next').textContent=mStep===4?'🎉 Find My Schemes!':'Continue →';
}
function selOpt(el,key,val){
  el.parentElement.querySelectorAll('.md-opt').forEach(o=>o.classList.remove('sel'));
  el.classList.add('sel'); mSels[key]=val;
}
function mNext(){
  if(mStep===1){
    const n=document.getElementById('m-name').value.trim();
    if(!n){document.getElementById('m-name').focus();return;}
    U.name=n; U.age=document.getElementById('m-age').value.trim();
    U.gender=document.getElementById('m-gender').value;
  }
  if(mStep===2){U.state=document.getElementById('m-state').value;U.cat=mSels.cat||'';}
  if(mStep===3){U.edu=mSels.edu||'';}
  if(mStep===4){U.inc=mSels.inc||'';finishOnboard();return;}
  mStep++;updModal();
}
function finishOnboard(){
  document.getElementById('modal').classList.add('hidden');
  if(U.name){profileSet=true;updateUI();updateDashboard();}
}

