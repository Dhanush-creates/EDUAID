/* ════════════════════════════════════════════════
   EduAI — Eligibility Checker Panel
   Stage 1 · Ministry of Education
   ════════════════════════════════════════════════ */

// ══ ELIGIBILITY CHECKER ══
function runElig(){
  const eu = {
    name:document.getElementById('ef-name').value.trim(),
    age:document.getElementById('ef-age').value.trim(),
    gender:document.getElementById('ef-gender').value,
    state:document.getElementById('ef-state').value,
    cat:document.getElementById('ef-cat').value,
    inc:document.getElementById('ef-inc').value,
    edu:document.getElementById('ef-edu').value,
    marks:document.getElementById('ef-marks').value.trim(),
    stream:document.getElementById('ef-stream').value,
  };
  if(!eu.cat||!eu.edu||!eu.inc){
    alert('Please fill in at least Category, Education Level, and Income to get accurate results.');
    return;
  }
  // Update global profile if name given
  if(eu.name){Object.assign(U,eu);profileSet=true;updateUI();updateDashboard();}
  // Score all schemes
  const results = SCHEMES.map(s=>{
    const r=scoreScheme(s,eu);
    return {...s,...r};
  }).filter(s=>s.score>0).sort((a,b)=>b.score-a.score);
  const eligible=results.filter(r=>r.eligible);
  const partial=results.filter(r=>!r.eligible&&r.score>0);
  const resEl=document.getElementById('elig-results');
  const listEl=document.getElementById('elig-list');
  document.getElementById('eres-count').textContent=eligible.length+' eligible, '+partial.length+' partial';
  let html='';
  if(eligible.length>0){
    html+=`<div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--gn);margin-bottom:8px">✅ Fully Eligible (${eligible.length})</div>`;
    html+=eligible.map((s,i)=>`
      <div class="erc" style="animation-delay:${i*.07}s" onclick="sendQ('How to apply for ${s.name}?');goPanel('chat')">
        <div class="erc-ico" style="background:${bgMap[s.col]}">${s.ico}</div>
        <div style="flex:1">
          <div class="erc-name">${s.name}</div>
          <div class="erc-by">${s.by}</div>
          <div class="erc-brow">
            <div class="erc-b"><div class="erc-bf" style="width:${s.score}%;background:${scoreColor(s.score)}"></div></div>
            <div class="erc-pct" style="color:${scoreColor(s.score)}">${s.score}%</div>
          </div>
          <div style="font-size:11px;color:var(--gn);margin-top:3px">${s.reasons.slice(0,2).join(' · ')}</div>
        </div>
        <div class="erc-r"><div class="erc-amt">${s.amt}</div><div class="erc-why">Click to apply</div></div>
      </div>`).join('');
  }
  if(partial.length>0){
    html+=`<div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--gd);margin:16px 0 8px">⚠️ Partially Eligible — Missing Criteria (${partial.length})</div>`;
    html+=partial.map((s,i)=>`
      <div class="erc" style="animation-delay:${(i+eligible.length)*.07}s;opacity:.85" onclick="sendQ('${s.name} eligibility criteria');goPanel('chat')">
        <div class="erc-ico" style="background:${bgMap[s.col]}">${s.ico}</div>
        <div style="flex:1">
          <div class="erc-name">${s.name}</div>
          <div class="erc-by">${s.by}</div>
          <div class="erc-brow">
            <div class="erc-b"><div class="erc-bf" style="width:${s.score}%;background:var(--gd)"></div></div>
            <div class="erc-pct" style="color:var(--gd)">${s.score}%</div>
          </div>
          <div style="font-size:11px;color:var(--rd);margin-top:3px">🚫 ${s.blocks[0]||''}</div>
        </div>
        <div class="erc-r"><div class="erc-amt">${s.amt}</div></div>
      </div>`).join('');
  }
  if(results.length===0){
    html=`<div class="eno-results"><div class="eno-ico">😕</div><div class="eno-t">No matches found</div><div class="eno-s">Based on your current profile, no schemes match. Try adjusting your details or ask the AI assistant for guidance.</div></div>`;
  }
  listEl.innerHTML=html;
  resEl.classList.remove('hidden');
  resEl.scrollIntoView({behavior:'smooth'});
}

