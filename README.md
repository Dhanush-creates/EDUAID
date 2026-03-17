<div align="center">

# 🎓 EduAI
### *AI-Assisted Scholarship Discovery Platform*

**EduAI** is an AI-assisted web platform that helps Indian students cut through the noise of 140+ government schemes and find exactly which scholarships they're eligible for — in under 5 minutes.

<br>

[![Stage](https://img.shields.io/badge/Stage-1%20of%203-FF6B00?style=for-the-badge)](https://github.com/YOUR_USERNAME/eduai)
[![Focus](https://img.shields.io/badge/Ministry%20of%20Education-138808?style=for-the-badge)](https://education.gov.in)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)](docs/CONTRIBUTING.md)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com)

<br>

[**🐛 Report a Bug**](https://github.com/vedant131/eduai/issues/new?template=bug_report.md) &nbsp;·&nbsp; [**💡 Suggest a Scheme**](https://github.com/vedant131/eduai/issues/new?template=scheme_suggestion.md)

</div>

---

## 📖 The Story Behind EduAI

Every year, thousands of Indian students miss out on scholarships — not because they don't qualify, but because they simply **don't know they exist**.

The Indian government runs over **140 scholarship schemes** across 12 ministries. They're scattered across different portals, written in bureaucratic language, and finding the right one requires knowing your exact eligibility across category, income, education level, state, gender, marks, and stream — all at the same time. Most students give up trying.

**EduAI bridges that gap.**

Tell us who you are. We'll tell you exactly what you're eligible for, show you why, and walk you through how to apply — step by step.

> *EduAI helps students discover scholarships faster with AI-assisted guidance, connecting them to the educational support they deserve.*

---

## ✨ Features

<table>
<tr>
<td width="50%">

**🔍 Real Eligibility Engine**
Not fake percentages. Every scheme has actual rule-based logic. Change your category from OBC to General — the results change completely.

**🤖 AI Chat Assistant**
Just describe yourself: *"I'm 20, OBC from UP, doing BTech, family income 1.5 lakh"* — the AI parses it and returns matched schemes instantly.

**📊 Personalised Dashboard**
Eligible schemes, total benefit potential, and urgent deadlines — all updating live based on your profile.

**📅 Deadline Tracker**
Colour-coded urgency alerts. Red means apply today. Never miss a scholarship window again.

</td>
<td width="50%">

**🧮 Scholarship Calculator**
See how much you can earn through scholarships over your full degree. Compare taking a loan vs. applying for scholarships.

**📝 Exam Calendar**
JEE, NEET, CUET, GATE, UGC NET — upcoming dates, registration windows, and AI-generated preparation tips.

**🏛️ College Comparator**
IITs vs NITs, AIIMS vs JIPMER, IIM-A vs IIM-B — side-by-side on fees, rankings, average packages, and available scholarships.

**🗞️ Education News Feed**
Latest Ministry of Education notifications, new scheme launches, stipend revisions, and policy updates.

</td>
</tr>
</table>

---

## 🗺️ Roadmap

This project is being built in public, in stages. Each stage adds a new ministry scope and deeper technical capability.

```
┌─────────────────────────────────────────────────────────────────┐
│  Stage 1 (NOW)     Ministry of Education · 12 schemes           │
│                    Pure frontend · HTML + CSS + Vanilla JS       │
│                    Status: ✅ Live                               │
├─────────────────────────────────────────────────────────────────┤
│  Stage 2 (Q1 2026) + Ministry of Social Justice                 │
│                    + Ministry of Minority Affairs               │
│                    ~35 schemes total                            │
│                    React 18 · Node.js · Express · MongoDB        │
│                    User accounts · Saved profiles               │
│                    Status: 🔜 In Planning                       │
├─────────────────────────────────────────────────────────────────┤
│  Stage 3 (Q2 2026) All Central Ministries · 140+ schemes        │
│                    State-level schemes                          │
│                    Real-time NSP API integration                │
│                    React Native mobile app                      │
│                    Status: 🔜 Future                            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🗂️ Project Structure

```
eduai/
│
├── frontend/
│   ├── public/                    # Favicon, OG image, static assets
│   └── src/
│       ├── index.html             # ← App entry point — links all CSS and JS
│       │
│       ├── css/                   # Stylesheet modules (one file per concern)
│       │   ├── tokens.css         # Design tokens: colours, spacing, typography
│       │   ├── animations.css     # All @keyframes definitions
│       │   ├── landing.css        # Hero, marquee strip, features, CTA
│       │   ├── sidebar.css        # App shell, sidebar nav, topbar
│       │   ├── dashboard.css      # Dashboard cards, welcome banner, stats
│       │   ├── chat.css           # AI chat interface
│       │   ├── eligibility.css    # Eligibility checker form + results
│       │   ├── schemes.css        # Schemes grid, deadlines, profile, tabs
│       │   └── modal.css          # Onboarding modal
│       │
│       ├── js/                    # JavaScript modules (loaded in order)
│       │   ├── eligibility-engine.js  # Core engine: incAtOrBelow, SCHEMES, eligFn
│       │   ├── state.js               # Global state object (U), maps
│       │   ├── navigation.js          # goLand(), goApp(), goPanel(), setPage()
│       │   ├── onboarding.js          # Modal steps, selOpt(), mNext()
│       │   ├── ui.js                  # updateUI(), updateDashboard()
│       │   ├── eligibility.js         # runElig() — checker panel logic
│       │   ├── panels.js              # Schemes, deadlines, calculator, compare
│       │   ├── chat.js                # AI chat: initChat(), sendQ(), doSend()
│       │   └── init.js                # DOMContentLoaded + landing animations
│       │
│       ├── data/                  # Static data (Stage 2: loaded from API)
│       │   ├── schemes.js         # Scheme definitions with eligFn rules
│       │   ├── deadlines.js       # Scholarship deadlines
│       │   ├── news.js            # Education news items
│       │   ├── exams.js           # National exam calendar
│       │   └── colleges.js        # College comparison tables
│       │
│       ├── utils/                 # Pure utility functions (Stage 2 imports)
│       │   ├── eligibility.js     # Eligibility helpers (ES module version)
│       │   ├── chat.js            # Chat reply logic (ES module version)
│       │   └── helpers.js         # Formatting, DOM, colour utilities
│       │
│       ├── components/            # [Stage 2] React components
│       └── pages/                 # [Stage 2] React page components
│
├── backend/                       # [Stage 2] Node.js + Express API scaffold
│   ├── src/
│   │   ├── app.js                 # Express setup, middleware, routes
│   │   ├── server.js              # HTTP server entry point
│   │   ├── routes/                # API route definitions
│   │   ├── controllers/           # Business logic handlers
│   │   └── middleware/            # Auth, error handling
│   └── config/
│       ├── db.js                  # MongoDB connection
│       └── env.example            # Environment variable template
│
├── docs/
│   ├── ARCHITECTURE.md            # System design + data flow diagrams
│   ├── ELIGIBILITY_LOGIC.md       # Deep dive into the scoring engine
│   ├── CONTRIBUTING.md            # How to add schemes, fix bugs, open PRs
│   └── CHANGELOG.md               # What changed in each version
│
├── .github/
│   ├── workflows/deploy.yml       # CI/CD: auto-deploy to Vercel on main push
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md          # Bug report template
│   │   └── scheme_suggestion.md   # Template for suggesting new schemes
│   └── PULL_REQUEST_TEMPLATE.md   # PR checklist
│
├── .editorconfig                  # Consistent code style across all editors
├── .gitignore                     # Node, OS, editor ignores
├── LICENSE                        # MIT License
├── package.json                   # Project metadata + run scripts
├── vercel.json                    # Vercel deployment configuration
└── README.md                      # You are here
```

---

## ⚡ Getting Started

### Prerequisites

- A modern browser (Chrome 90+, Firefox 88+, Safari 14+)
- That's it — **no Node.js, no build step, no installs** required for Stage 1

### Run Locally

```bash
# Clone the repo
git clone https://github.com/vedant131/eduai.git
cd eduai

# Option A — open directly in browser (simplest, CSS/JS files load via relative paths)
# Double-click frontend/src/index.html  OR:
open frontend/src/index.html

# Option B — serve with a local server (recommended)
npx serve frontend/src -p 3000
# → App running at http://localhost:3000
```

> **⚠️ Note:** Because the CSS and JS are now separate files (`css/`, `js/` folders), opening `index.html` directly via `file://` protocol may block loading in some browsers. Use `npx serve` or any local server for the best experience.

### Deploy to Vercel (with your own URL)

> **Important:** The domain `eduai.vercel.app` is taken by an unrelated project. When you deploy, Vercel will give you a unique URL like `eduai-yourusername.vercel.app`. You can rename the project in Vercel's dashboard.

```bash
# 1. Push to GitHub first
git init && git add . && git commit -m "feat: Stage 1 launch"
git remote add origin https://github.com/YOUR_USERNAME/eduai.git
git push -u origin main

# 2. Deploy to Vercel
npm install -g vercel
cd eduai
vercel --prod
# → Set root directory to: frontend/src
# → Vercel will assign a unique URL like: eduai-abc123.vercel.app
```

**Or deploy via GitHub (easiest):**
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your `eduai` GitHub repo
3. Set **Root Directory** to `frontend/src`
4. Click Deploy — done in ~30 seconds
5. Go to **Project Settings → Domains** to set a custom domain

**After deploying, update your README:**
```
# Replace YOUR_USERNAME.github.io/eduai with your actual Vercel URL
sed -i 's|YOUR_USERNAME.github.io/eduai|your-actual-url.vercel.app|g' README.md
```

### Deploy to GitHub Pages (free, no account needed)

```bash
# In repo settings → Pages → Source: Deploy from branch
# Branch: main  |  Folder: /frontend/src
# Your app will be live at: https://YOUR_USERNAME.github.io/eduai
```

---

## 🧠 How the Eligibility Engine Works

The core of EduAI is a **rule-based eligibility engine** in `frontend/src/utils/eligibility.js`. Every scheme has its own `eligFn` — a function that takes a user profile and returns a real match score with detailed reasons.

```js
// Simplified example — NSP Post-Matric Scholarship
{
  name: 'NSP Post-Matric Scholarship',

  eligFn(userProfile) {
    let score = 0;
    const reasons = [], blocks = [];

    // Hard block — if this fails, score is 0, no further checks
    if (!isReserved(userProfile.category)) {
      blocks.push('Only for reserved categories: OBC / SC / ST / EWS / Minority');
      return { score: 0, reasons, blocks };
    }
    score += 40;
    reasons.push('✓ Category (OBC/SC/ST/EWS/Minority) matches');

    // Soft score — education level
    if (EDU_POSTMATRIC.includes(userProfile.education)) {
      score += 30;
      reasons.push('✓ Education level is post-matric (Class 11 – PhD)');
    }

    // Income gate
    if (incAtOrBelow(userProfile.income, '2.5L')) {
      score += 30;
      reasons.push('✓ Family income is within the ₹2.5L limit');
    } else {
      blocks.push('Family income must be below ₹2.5 lakh per year');
    }

    return { score: Math.min(score, 100), reasons, blocks };
  }
}
```

**Score interpretation:**

| Condition | Result |
|-----------|--------|
| `blocks.length === 0` AND `score ≥ 30` | ✅ Fully Eligible |
| `blocks.length > 0` AND `score > 0` | ⚠️ Partially Eligible (shows exactly what's missing) |
| Hard block returns early | ❌ Not Eligible (reason always shown) |

This is why **a General category student sees different results than OBC**, why **a girl student sees AICTE Pragati and a boy doesn't**, and why **a Class 9 student and a BTech student get completely different lists**.

See [docs/ELIGIBILITY_LOGIC.md](docs/ELIGIBILITY_LOGIC.md) for the full deep-dive.

---

## 📚 Schemes Database — Stage 1

| # | Scheme | By | Amount | Category | Education |
|---|--------|----|--------|----------|-----------|
| 1 | NSP Post-Matric | MoE | ₹25,000/yr | OBC/SC/ST/EWS/Minority | Class 11 – PhD |
| 2 | Central Sector | MoE | ₹20,000/yr | All | UG / PG |
| 3 | AICTE Pragati | AICTE | ₹50,000/yr | All · Girls only | BTech / BE |
| 4 | INSPIRE | DST | ₹80,000/yr | All | BSc / MSc |
| 5 | CSIR-UGC NET JRF | UGC | ₹37,000/mo | All | PG / PhD |
| 6 | Begum Hazrat Mahal | MAEF | ₹12,000/yr | Minority · Girls | Class 9 – 12 |
| 7 | PM Research Fellowship | MoE | ₹80,000/mo | All | PhD |
| 8 | AICTE Saksham | AICTE | ₹30,000/yr | Differently-abled | BTech / BE |
| 9 | Maulana Azad Fellowship | MMA | ₹28,000/mo | Minority | MPhil / PhD |
| 10 | NSP Pre-Matric | MoE | ₹5,000/yr | OBC/SC/ST/Minority | Class 9 – 10 |
| 11 | Ishan Uday | UGC | ₹7,800/mo | All · NE domicile | UG |
| 12 | PM-YASASVI | MoSJ | ₹1.25L/yr | OBC / EBC / DNT | Class 9 – Degree |

---

## 🤝 Contributing

Contributions make this project better for every student who uses it. Here's how you can help:

**🆕 Add a new scheme**
1. Open `frontend/src/data/schemes.js`
2. Copy an existing scheme block as a template
3. Write the `eligFn` with real criteria from the official scheme notification
4. Add to the `SCHEMES` array and open a PR

**🐛 Fix eligibility logic**
Found an edge case or wrong rule? Fix the `eligFn` in `data/schemes.js` and submit with a test case description.

**💅 Improve the UI**
CSS lives in `frontend/src/styles/`. Logic lives in `frontend/src/utils/`. They don't mix.

**📖 Improve documentation**
Better docs help future contributors. PRs for `docs/` are always welcome.

Read [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for the full guide, code conventions, and PR checklist.

---

## 🐛 Issues & Feedback

- **Found a bug?** → [Open a bug report](https://github.com/YOUR_USERNAME/eduai/issues/new?template=bug_report.md)
- **Know a scheme we're missing?** → [Suggest it](https://github.com/YOUR_USERNAME/eduai/issues/new?template=scheme_suggestion.md)
- **General discussion?** → [Start a discussion](https://github.com/YOUR_USERNAME/eduai/discussions)

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for full terms.

This project uses publicly available government scheme data from Ministry of Education, AICTE, UGC, and DST websites. This is not an official government platform. Always verify eligibility and apply at official portals.

---

## 🙏 Acknowledgements

- [Ministry of Education, Govt. of India](https://www.education.gov.in/)
- [National Scholarship Portal](https://scholarships.gov.in/) — the actual application portal
- [AICTE](https://www.aicte-india.org/) — Pragati & Saksham schemes
- [UGC](https://ugc.ac.in/) — JRF fellowship & Ishan Uday
- [DST](https://dst.gov.in/) — INSPIRE scholarship
- [Google Fonts](https://fonts.google.com/) — Syne & Plus Jakarta Sans typefaces

---

<div align="center">

Made with ❤️ for every Indian student who deserves to know what they're entitled to.

**If EduAI helped you — or could help someone you know — please ⭐ star this repo.**<br>
It helps more students find us.

</div>

# EDUAID
