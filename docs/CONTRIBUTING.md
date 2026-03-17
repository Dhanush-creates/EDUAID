# Contributing to EduAI

First of all — thank you for wanting to help. Every scheme we add, every bug we fix, and every UX improvement we make is another student who finds the support they're entitled to.

This guide will get you contributing in under 10 minutes.

---

## Ways to Contribute

### 🆕 Add a Missing Scheme
This is the most impactful thing you can do. Found a scholarship we haven't covered? Add it.

**How:**
1. Find the official scheme notification (from the ministry website or NSP)
2. Open `frontend/src/data/schemes.js`
3. Copy an existing scheme block as a template
4. Fill in the metadata and write the `eligFn` with real criteria
5. Open a PR with the scheme name in the title

**What a good scheme addition looks like:**
```js
{
  id:     'scheme-id',          // lowercase-hyphenated, unique
  ico:    '🎓',                  // relevant emoji
  col:    'sf',                  // colour key: sf | gn | bl | gd | pu | pk | rd
  type:   'scholarship',         // scholarship | fellowship | grant
  name:   'Official Scheme Name',
  by:     'Issuing Ministry / Body',
  portal: 'https://official-portal.gov.in',
  amt:    '₹X,XXX / year',
  amtNum: 25000,                 // raw number, annual, in rupees
  tags:   ['3–4 short criteria pills'],

  eligFn(u) {
    // Real rules from the official notification
    // See docs/ELIGIBILITY_LOGIC.md for the full guide
  }
}
```

Read [docs/ELIGIBILITY_LOGIC.md](ELIGIBILITY_LOGIC.md) before writing your `eligFn`.

---

### 🐛 Fix Eligibility Logic
If a scheme is matching students it shouldn't — or blocking students it should match — open an issue describing expected vs. actual behaviour, then fix the `eligFn` in `data/schemes.js`.

---

### 💅 Improve the UI
- CSS tokens are in `frontend/src/styles/tokens.css`
- Global styles are in `frontend/src/styles/base.css`
- Stage 1 has inlined CSS inside `index.html` for zero-dependency deployment
- Please keep logic and styling separate — don't edit eligibility when fixing CSS

---

### 📖 Improve Documentation
Docs are in `docs/`. Plain Markdown. No tooling required. Always welcome.

---

### 🗞️ Update News / Exam Data
- News items: `frontend/src/data/news.js`
- Exam calendar: `frontend/src/data/exams.js`

These are static in Stage 1. If a date or fact is wrong, fix it and open a PR.

---

## Getting Set Up

```bash
# Fork the repo on GitHub, then clone your fork:
git clone https://github.com/YOUR_USERNAME/eduai.git
cd eduai

# No npm install needed for Stage 1
# Open directly or serve locally:
npx serve frontend/src -p 3000
# → http://localhost:3000
```

---

## Code Style

- **Indentation:** 2 spaces (enforced by `.editorconfig`)
- **Quotes:** Single quotes in JavaScript
- **Naming:** `camelCase` for variables/functions, `kebab-case` for IDs and file names
- **Comments:** Explain *why*, not *what*. The code says what — the comment says why.

---

## Commit Message Format

```
feat: add Ishan Uday NE scholarship
fix: NSP income limit was checking wrong bracket
docs: add eligFn writing guide to ELIGIBILITY_LOGIC.md
style: fix mobile overflow on dashboard cards
data: update JEE Main 2026 exam dates
```

---

## Pull Request Checklist

Before opening a PR:

- [ ] Works correctly in Chrome, Firefox, and Safari
- [ ] If adding a scheme — tested against at least 4 different user profiles
- [ ] If fixing eligibility — describe before/after behaviour in the PR description
- [ ] No `console.log` statements left behind
- [ ] No unrelated file changes

---

## Code of Conduct

Be kind. Be constructive. This project serves students — let's keep the community welcoming to everyone who wants to contribute.

---

Thank you for contributing. Every improvement here reaches real students. 🙏
