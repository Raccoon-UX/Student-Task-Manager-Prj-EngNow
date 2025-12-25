
# Student-Task-Manager-Prj-EngNow
A full-stack web application designed to help students manage their tasks with a gamified experience. Built with the **MERN stack** to help students organize their academic life with AI-powered intelligence and Visual Analytics.
=======
# Student Task Manager 🎓

A full-stack web application designed to help students manage their tasks with a gamified experience. Built with the MERN stack (MongoDB, Express, React, Node.js).

![Project Preview](student-task-manager-prj-eng-674ta5p36-vsujal956-5034s-projects.vercel.app)

##  Features

- **AI Task Strategizer**: Integration with **Google Gemini AI** to automatically suggest actionable sub-tasks for any study goal.
- **Visual Progress Charts**: Interactive Pie Charts using **Recharts** to visualize "Completed" vs "Pending" tasks.
- **Task Management (CRUD)**: Create, Read, Update, and Delete tasks with custom priorities.
- **Smart Deadlines**: Set due dates for assignments and receive **Red/Overdue alerts** for pending tasks.
- **Secure Authentication**: JWT-based Signup and Login to keep your personal study data private.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Axios, Recharts, React Router.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB Atlas.
- **AI Engine**: Google Generative AI (Gemini 1.5 Flash).

## 📦 Project Structure

```
student-task-manager/
├── backend/                # Node.js + Express
│   ├── config/             # DB connection settings
│   ├── models/             # MongoDB Schema (Task, User)
│   ├── routes/             # API Endpoints
│   ├── middleware/         # Auth (JWT) middleware
│   ├── .env                # Environment variables (MONGO_URI)
│   ├── server.js           # Entry point
│   └── package.json
├── frontend/               # React (Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI (TaskCard, FilterBar)
│   │   ├── api/            # Axios instance/API calls
│   │   ├── App.jsx         # Root component
│   │   └── main.jsx
│   ├── .env                # VITE_API_URL
│   ├── package.json
│   └── tailwind.config.js  # Optional styling config
└── README.md               # Project documentation
```

## ⚙️ Setup & Installation

1. **Clone & Install**: `npm install` in both frontend and backend folders.
2. **Env Variables**: Set `MONGO_URI`, `JWT_SECRET`, and `GEMINI_API_KEY` in `backend/.env`.
3. **Run**: Use `node server.js` for backend and `npm run dev` for frontend.

## 📄 License
MIT
>>>>>>> 6c4ff3e (Files Uploded)
