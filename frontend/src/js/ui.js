/* ════════════════════════════════════════════════
   EduAI — UI Updates & Dashboard Rendering
   Stage 1 · Ministry of Education
   ════════════════════════════════════════════════ */

// ══ UPDATE UI ══
function updateUI(){
  if(!U.name) return;
  const init=U.name.charAt(0).toUpperCase();
  document.getElementById('sbAv').textContent=init;
  document.getElementById('sbName').textContent=U.name;
  document.getElementById('sbCls').textContent=[U.edu,U.state].filter(Boolean).join(' · ')||'Student';
  document.getElementById('wbName').textContent=`Hello, ${U.name.split(' ')[0]}! 👋`;
  document.getElementById('profAv').textContent=init;
  document.getElementById('profName').textContent=U.name;
  document.getElementById('profSub').textContent=U.edu?`${U.edu} student`:'Student';
  if(U.cat){
    document.getElementById('profTags').innerHTML=[U.cat,U.state,U.edu].filter(Boolean).map((t,i)=>{
      const cs=['b-sf','b-bl','b-gn'];
      return `<div class="prof-tag ${cs[i]||'b-sf'}">${t}</div>`;
    }).join('');
  }
  ['name','age','gender','state'].forEach(k=>{const el=document.getElementById('pi-'+k);if(el)el.textContent=U[k]||'—';});
  document.getElementById('pi-cat').textContent=U.cat||'—';
  document.getElementById('pi-edu').textContent=U.edu||'—';
  document.getElementById('pi-marks').textContent=U.marks?(U.marks+'%'):'—';
  document.getElementById('pi-inc').textContent=U.inc||'—';
  // hide profile warning
  if(profileSet){
    document.getElementById('no-prof-warn').style.display='none';
    document.getElementById('chk2-ico').textContent='✓';
    document.getElementById('chk2-ico').style.cssText='background:var(--gnl);color:var(--gn)';
    document.getElementById('chk2-stat').textContent='Done';
    document.getElementById('chk2-stat').style.cssText='background:var(--gnl);color:var(--gn)';
  }
}

function updateDashboard(){
  const eligible=getEligibleSchemes(U);
  const count=eligible.length;
  const pot=eligible.length>0?eligible.reduce((s,e)=>s+e.amtNum,0):0;
  document.getElementById('wb-matched').textContent=count||'—';
  document.getElementById('wb-pot').textContent=count>0?'₹'+Math.round(pot/1000)+'K+':'—';
  document.getElementById('sc-matched').textContent=count||'—';
  document.getElementById('sc-matched-chg').textContent=count>0?count+' found →':'Check →';
  document.getElementById('sc-pot').textContent=count>0?'₹'+Math.round(pot/1000)+'K':'—';
  // Update welcome text
  if(count>0){
    document.getElementById('wbSub').textContent=`You match ${count} scheme${count>1?'s':''} worth up to ₹${Math.round(pot/1000)}K/year. Don't miss the October 31 NSP deadline!`;
    // notice for category-specific
    if(U.cat==='General'&&count<3){
      document.getElementById('wb-notice').style.display='flex';
      document.getElementById('wb-notice-txt').textContent='As General category, fewer income-based schemes apply. Focus on merit scholarships!';
    }
  } else if(U.cat&&U.edu&&U.inc){
    document.getElementById('wbSub').textContent='No direct matches based on current profile. Try the eligibility checker for detailed analysis.';
  }
  // Top matches in dashboard
  const topEl=document.getElementById('dash-top-matches');
  if(eligible.length===0){
    topEl.innerHTML=`<div style="text-align:center;padding:16px;color:var(--t3);font-size:13px">${profileSet?'No matches found — try eligibility checker for details':'Complete your profile to see matches'}</div>`;
  } else {
    topEl.innerHTML=eligible.slice(0,3).map(s=>`
      <div class="qsi" onclick="sendQ('Tell me about ${s.name}');goPanel('chat')">
        <div class="qsi-ico" style="background:${bgMap[s.col]}">${s.ico}</div>
        <div><div class="qsi-name">${s.name}</div><div class="qsi-by">${s.by}</div></div>
        <div class="qsi-r"><div class="qsi-amt">${s.amt}</div><div class="qsi-m" style="color:${scoreColor(s.score)}">✓ ${s.score}% match</div></div>
      </div>`).join('');
  }
}

