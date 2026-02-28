# CipherSQLStudio

CipherSQLStudio is a browser-based SQL learning platform that allows students to practice SQL queries on pre-configured assignments.

The main idea of this project is to create an environment where students can write and execute SQL queries in real-time and also get guided hints using an AI model, without directly showing the full solution.

This project focuses mainly on the user experience for solving SQL assignments rather than creating or managing databases.

---

## Project Overview

In this platform, users can:

- View available SQL assignments loaded from MongoDB
- Select and attempt an assignment
- Write SQL queries using Monaco Editor (VS Code style editor)
- Execute queries in real-time against PostgreSQL
- View results in a formatted table
- See the sample data and table schema for the assignment
- Get AI-generated hints if they are stuck (without revealing the solution)
- Have their query attempts automatically saved to MongoDB

The database and assignments are already pre-configured. Users can only attempt and solve them.

---

## Tech Stack Used

### Frontend
- React (with Vite)
- React Router DOM
- Monaco Editor (for SQL editing)
- Vanilla SCSS (mobile-first design)

### Backend
- Node.js
- Express.js
- PostgreSQL (sandbox DB for executing SQL queries)
- MongoDB Atlas (persistence for assignments and query attempts)
- Groq API — Llama 3.1 8B (AI hint generation)

---

## Folder Structure

```
CipherSQLStudio/
│
├── client/                   → React frontend
│   ├── .env.example
│   └── src/
│       ├── pages/
│       │   ├── AssignmentList.jsx
│       │   └── AttemptPage.jsx
│       ├── styles/
│       │   ├── base/          (_variables, _mixins, _global)
│       │   ├── components/    (_navbar)
│       │   ├── pages/         (_assignmentList, _attemptPage)
│       │   └── main.scss
│       ├── App.jsx
│       └── main.jsx
│
├── server/                   → Express backend
│   ├── .env.example
│   ├── config/
│   │   ├── db.js             (MongoDB connection)
│   │   └── postgres.js       (PostgreSQL pool)
│   ├── controllers/
│   │   ├── assignmentController.js
│   │   ├── queryController.js
│   │   ├── hintController.js
│   │   └── attemptController.js
│   ├── models/
│   │   ├── Assignment.js     (Mongoose model)
│   │   └── Attempt.js        (Mongoose model)
│   ├── routes/
│   │   ├── assignmentRoutes.js
│   │   ├── queryRoutes.js
│   │   ├── hintRoutes.js
│   │   └── attemptRoutes.js
│   ├── seed.js               (Seed assignments into MongoDB)
│   └── server.js
│
└── README.md
```

---

## How to Run the Project

### 1. Clone the Repository

```bash
git clone <repository-url>
cd CipherSQLStudio
```

---

## Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder using `.env.example` as reference:

```
PORT=5000
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=ciphersqlstudio
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password_here
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/ciphersqlstudio
GROQ_API_KEY=your_groq_api_key_here
```

**Seed the database** (first time setup — inserts assignments into MongoDB):

```bash
npm run seed
```

**Start the backend:**

```bash
npm start
```

Backend runs on: `http://localhost:5000`

---

## Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file inside the `client/` folder using `.env.example` as reference:

```
VITE_API_URL=http://localhost:5000
```

**Start the frontend:**

```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/assignments` | List all assignments |
| GET | `/api/assignments/:id` | Get single assignment with question, schema, and sample data |
| POST | `/api/execute` | Execute a SQL query against PostgreSQL |
| POST | `/api/hint` | Get an AI hint for the current query |
| POST | `/api/attempts` | Save a query attempt to MongoDB |
| GET | `/api/attempts/:assignmentId` | Get all attempts for an assignment |

---

## How Query Execution Works (Data Flow)

1. User selects an assignment → frontend fetches it from MongoDB via `/api/assignments/:id`
2. Assignment question, table schema, and sample data are displayed
3. User writes a SQL query in the Monaco Editor
4. User clicks **Execute Query**
5. Frontend sends a POST request to `/api/execute` with the query and assignmentId
6. Backend validates the query — only SELECT queries are allowed
7. If valid, PostgreSQL executes the query against the sandbox database
8. Results are returned as JSON and displayed in a dynamic table
9. The attempt (query, success, rowCount) is saved to MongoDB

---

## LLM Hint System

This project uses Groq API (Llama 3.1 8B-instant model) to generate hints.

When the user clicks **Get Hint**:

1. The frontend sends the real assignment question and user's current query to `/api/hint`
2. Backend builds a controlled prompt with strict instructions
3. The AI model generates a conceptual hint — no full SQL code
4. The hint is displayed in the UI

### Prompt Engineering

The prompt instructs the model:
- NOT to provide the full SQL query
- NOT to reveal complete solutions
- Only to give conceptual guidance (which clause to use, how to think about it)

---

## Security Measures

- Only SELECT queries are allowed — destructive queries (DROP, DELETE, UPDATE, INSERT) are blocked
- Environment variables are stored in `.env` (never committed to git)
- API keys are never exposed to the frontend
- All database interactions are handled by the backend

---

## Responsive Design

The UI follows a **mobile-first** approach.

Breakpoints:
- **320px** — Mobile (base)
- **641px** — Tablet
- **1024px** — Desktop
- **1281px** — Large screens

SCSS features used:
- Variables (`_variables.scss`)
- Mixins (`_mixins.scss` — includes `bp()` breakpoint mixin, `glass-card`, `btn-primary`, etc.)
- Nesting
- Partial files imported via `main.scss`
- BEM naming convention throughout

---

## Design Decisions

- **PostgreSQL** is used as a sandbox database to simulate real SQL practice environments
- **MongoDB** stores assignment metadata (question, schema, difficulty) and user attempt history
- **Monaco Editor** provides a real VS Code-like coding experience in the browser
- **Groq API** is used for fast and cost-efficient hint generation via Llama 3.1
- Query validation prevents database misuse

---

## Limitations

- Only SELECT queries are supported (by design)
- No authentication system in the current version
- Assignments are pre-seeded and cannot be created by users via the UI

---

## Future Improvements

- Add user authentication (Login/Signup)
- Track individual user progress
- Add admin dashboard for managing assignments
- Automatic query correctness checking (compare result sets)
- Leaderboard / scoring system