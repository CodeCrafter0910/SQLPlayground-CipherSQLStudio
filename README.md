# CipherSQLStudio

CipherSQLStudio is a browser-based SQL learning platform that allows students to practice SQL queries on pre-configured assignments. 

The main idea of this project is to create an environment where students can write and execute SQL queries in real-time and also get guided hints using an AI model, without directly showing the full solution.

This project focuses mainly on the user experience for solving SQL assignments rather than creating or managing databases.

---

## Project Overview

In this platform, users can:

- View available SQL assignments
- Select and attempt an assignment
- Write SQL queries using a code editor (Monaco Editor)
- Execute queries in real-time
- View results in a formatted table
- Get AI-generated hints if they are stuck

The database and assignments are already pre-configured. Users can only attempt and solve them.

---

## Tech Stack Used

### Frontend
- React (with Vite)
- React Router
- Monaco Editor (for SQL editing)
- Vanilla SCSS (mobile-first design)

### Backend
- Node.js
- Express.js
- PostgreSQL (for executing SQL queries)
- MongoDB Atlas (for persistence)
- Groq API (for AI hint generation)


## Folder Structure

CipherSQLStudio/
│
├── client/        → React frontend
│   └── src/
│       ├── pages/
│       ├── styles/
│       └── components/
│
├── server/        → Express backend
│   ├── controllers/
│   ├── routes/
│   ├── config/
│   └── server.js
│
└── README.md


## How to Run the Project

### 1. Clone the Repository

  bash
git clone <repository-url>
cd CipherSQLStudio


## Backend Setup

Go to server folder:

  bash
cd server
npm install
 

Create a .env file inside the server folder using the .env.example file as reference.

You need to configure:

- PostgreSQL credentials
- MongoDB connection string
- Groq API key

Start backend:

   bash
npm start


Backend runs on:
 
http://localhost:5000
 

## Frontend Setup

Go to client folder:

   bash
cd client
npm install
npm run dev
 
Frontend runs on:
 
http://localhost:5173
 

## How Query Execution Works (Data Flow)

1. User writes SQL query in Monaco Editor.
2. Clicks "Execute Query".
3. Frontend sends a POST request to `/api/execute`.
4. Backend validates the query (only SELECT allowed).
5. If valid, PostgreSQL executes it.
6. Results are sent back as JSON.
7. Frontend displays results in a dynamic table.

---

## LLM Hint System

This project uses Groq API to generate hints for students.

When the user clicks "Get Hint":

1. The frontend sends the assignment question and the user's current query.
2. Backend builds a controlled prompt.
3. The AI model generates a conceptual hint.
4. The hint is displayed in the UI.

### Important

The prompt clearly instructs the model:

- Not to provide the full SQL query.
- Not to reveal complete solutions.
- Only to give guidance.

This ensures that students get help without directly getting answers.


## Security Measures

- Only SELECT queries are allowed.
- Destructive queries like DROP, DELETE, UPDATE are blocked.
- Environment variables are stored in `.env`.
- API keys are not exposed to the frontend.
- All database interaction is handled by the backend.

---

## Responsive Design

The UI follows a mobile-first approach.

Breakpoints considered:
- 320px (Mobile)
- 641px (Tablet)
- 1024px (Desktop)
- 1281px (Large screens)

SCSS features used:
- Variables
- Nesting
- Partial files
- BEM naming convention

---

## Design Decisions

- PostgreSQL is used as a sandbox database to simulate real SQL practice.
- MongoDB is used for flexible data storage.
- Monaco Editor gives a real coding experience similar to VS Code.
- Groq API is used for fast and cost-efficient hint generation.
- Query validation is implemented to prevent database misuse.

---

## Limitations

- Only SELECT queries are supported.
- No authentication system is implemented.
- Assignments are pre-configured and cannot be created by users.

---

## Future Improvements

- Add user authentication (Login/Signup)
- Save query attempt history
- Track assignment progress
- Add admin dashboard
- Add automatic query correctness checking

---

## Conclusion

CipherSQLStudio provides a practical SQL learning environment where students can execute real queries and receive AI-based hints while maintaining security and learning integrity.

This project helped me understand full-stack development, database interaction, API integration, prompt engineering, and responsive UI design.