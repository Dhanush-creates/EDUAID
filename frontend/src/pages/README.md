# frontend/src/pages/

Full page/panel views — **Stage 2 (React migration)**.

## Planned pages

| File | Panel | Description |
|------|-------|-------------|
| `Dashboard.jsx` | Dashboard | Welcome banner, stat cards, top matches, trending, tips |
| `Chat.jsx` | AI Chat | Full chat interface with message history |
| `Eligibility.jsx` | Eligibility Checker | 9-field form + scored results list |
| `Schemes.jsx` | All Schemes | Filterable scheme grid with live match scores |
| `Deadlines.jsx` | Deadlines | Full deadline list with urgency alerts |
| `News.jsx` | Education News | News card feed |
| `ExamCalendar.jsx` | Exam Calendar | Grouped exam events with countdowns |
| `Calculator.jsx` | Scholarship Calculator | Benefit estimator + loan comparison |
| `CollegeCompare.jsx` | College Compare | Comparison tables (IITs, NITs, etc.) |
| `Profile.jsx` | My Profile | Profile display + edit trigger |

## Stage 1 note

In Stage 1, each panel is rendered as a `<div class="panel">` inside `index.html`.
These React components will be created during Stage 2 migration.
