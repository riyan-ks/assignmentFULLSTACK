# Cipher MVP – Tasks, Goals, Focus & Mood Board

A productivity web application built with **React (Vite)** that combines task management, goal tracking, focus sessions, and a customizable mood board in one place.

All data persists using **localStorage**, so progress remains even after refreshing the page.

---

## Features

### P1 – TaskBoard
Manage daily work efficiently.

- Add tasks quickly
- Inline task editing
- Task grouping:
  - Overdue
  - Today
  - Upcoming
  - No Date
- Optional due dates:
  - Today
  - Tomorrow
  - This Week
  - Custom
- Mark tasks complete with fade animation
- Create subtasks
- Delete tasks with cascading removal

---

### P2 – GoalTracker
Track long-term goals.

- Create goals
- Edit goals inline
- Set optional target dates
- Progress tracking (0–100%)
- Progress visualization

---

### P3 – FocusTimer
Stay focused while working.

- Countdown timer
- Start / Pause / Reset controls
- Custom timer hook
- Timer display in `mm:ss` format
- Prevent duplicate intervals

---

### P4 – MoodBoard
Personal inspiration space.

- Grid layout display
- Add color tiles
- Add image URLs
- Remove mood items
- Dynamic rendering

---

### P5 – Dashboard
Unified application interface.

- Navigation between sections
- Persistent active section
- Shared layout across all modules

---

## Persistence Layer

Application state is stored using:

- `localStorage`
- Custom `useLocalStorage()` hook
- Automatic synchronization

Data persists across browser refreshes.

---

## Tech Stack

- React
- Vite
- JavaScript
- HTML
- CSS
- React Hooks
  - `useState`
  - `useEffect`
- LocalStorage API

---

## Project Structure

```plaintext
src/
│
├── components/
│   ├── TaskBoard/
│   ├── GoalTracker/
│   ├── FocusTimer/
│   ├── MoodBoard/
│   └── Dashboard/
│
├── hooks/
│   ├── useLocalStorage.js
│   └── useTimer.js
│
├── utils/
│
├── App.jsx
└── main.jsx
```

---

## Installation

Clone the repository:

```bash
git clone <your-repo-url>
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

---

## Development Approach

1. Build application state structure
2. Implement persistence layer
3. Develop TaskBoard
4. Add GoalTracker
5. Build FocusTimer
6. Add MoodBoard
7. Integrate everything into Dashboard

---

## Future Improvements

- Backend integration
- Authentication
- Cloud sync
- Analytics dashboard
- Drag & drop support

---