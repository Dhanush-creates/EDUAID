/* ════════════════════════════════════════════════
   EduAI — App Init & Landing Animations
   Stage 1 · Ministry of Education
   ════════════════════════════════════════════════ */

// ══ INIT ══
window.addEventListener('DOMContentLoaded',()=>{
  renderSchemes(); renderDeadlines();
  updateDashboard();
});
window.goPanel=goPanel; window.sendQ=sendQ; window.goApp=goApp; window.goLand=goLand;
window.filterSch=filterSch; window.renderCompare=renderCompare;


// ══════════════════════════════════════════════
//  LANDING PAGE ANIMATIONS — Intersection Observer
// ══════════════════════════════════════════════

(function() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        if (e.target.classList.contains("anim-card")) {
          const siblings = e.target.parentElement.querySelectorAll(".anim-card");
          siblings.forEach((el, i) => {
            setTimeout(() => el.classList.add("vis"), i * 75);
          });
        } else {
          e.target.classList.add("vis");
        }
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });

  function initObserver() {
    document.querySelectorAll(
      ".anim-reveal, .anim-card, .sec-lbl, .sec-h, .sec-sub, .cta-h, .cta-sub, .btnw, .trust-badge"
    ).forEach(el => io.observe(el));
  }

  // Pause marquee when tab is hidden
  document.addEventListener("visibilitychange", () => {
    const t = document.querySelector(".marquee-track");
    if (t) t.style.animationPlayState = document.hidden ? "paused" : "running";
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initObserver);
  } else {
    initObserver();
  }
})();

/*
 * ── Stage 1 Note ──────────────────────────────────────────────
 * All JS is currently inlined for zero-dependency deployment.
 * The clean, separated versions of each module already exist at:
 *
 *   frontend/src/utils/eligibility.js  ← eligibility engine
 *   frontend/src/utils/chat.js         ← AI reply logic
 *   frontend/src/utils/helpers.js      ← formatting / DOM utils
 *   frontend/src/data/schemes.js       ← scheme definitions
 *   frontend/src/data/deadlines.js     ← deadline data
 *   frontend/src/data/news.js          ← news data
 *   frontend/src/data/exams.js         ← exam calendar data
 *   frontend/src/data/colleges.js      ← college compare data
 *
 * Stage 2 will migrate this file to React components using those
 * modules, with Vite as the build tool:
 *
 *   frontend/src/pages/Dashboard.js
 *   frontend/src/pages/Chat.js
 *   frontend/src/pages/Eligibility.js
 *   frontend/src/pages/Schemes.js
 *   frontend/src/pages/Deadlines.js
 *   frontend/src/pages/News.js
 *   frontend/src/pages/ExamCalendar.js
 *   frontend/src/pages/Calculator.js
 *   frontend/src/pages/CollegeCompare.js
 *   frontend/src/pages/Profile.js
 * ────────────────────────────────────────────────────────────
 */
