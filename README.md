🚀 Preparation Tracker (MERN Stack)

A full-stack web application to track coding interview questions, similar to LeetCode-style progress tracking. Users can add, manage, and analyze their problem-solving journey with authentication and personalized dashboards.

---

✨ Features
🔐 **User Authentication (JWT)**

  * Signup & Login
  * Secure password hashing using bcrypt

📊 **Dashboard**

  * Profile section (Name, Email, Bio)
  * Analytics (Total, Solved, Pending questions)

📋 **Question Management**

  * Add questions with:

    * Title
    * Difficulty
    * Topic
    * Status
    * Strategy/Notes
  * View all questions in table format
  * Delete questions
  * Update strategy using modal

🔍 **Search & Filter**

  * Search by title
  * Filter by difficulty

🎨 **Modern UI**

  * Clean dashboard layout
  * Card-based design
  * Modal interactions

🧠 Tech Stack

Frontend:
* React.js
* React Hooks (useState, useEffect)
* Axios
* Inline CSS styling

Backend:
* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt.js

---
📁 Project Structure

```
client/
  ├── src/
      ├── pages/
      ├── components/
      ├── App.jsx

server/
  ├── models/
  ├── routes/
  ├── middleware/
  ├── server.js

 ⚙️ Installation & Setup
1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/interview-tracker.git
cd interview-tracker
```

---
2️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npx nodemon server.js
```
3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

🔐 Authentication Flow

1. User logs in → JWT token generated
2. Token stored in localStorage
3. Token sent in headers for protected routes
4. Middleware verifies token


🔄 API Endpoints
Auth
* POST `/auth/signup`
* POST `/auth/login`

Questions
* GET `/questions`
* POST `/questions`
* PUT `/questions/:id`
* DELETE `/questions/:id`

User
* GET `/user/profile`
* PUT `/user/update`

Key Concepts Used
* React Controlled Components
* State Management (useState)
* Side Effects (useEffect)
* REST API Design
* JWT Authentication
* Middleware in Express
* MongoDB Schema Design

🚀 Future Improvements

* ⭐ Favorite Questions
* 📊 Graph Analytics
* 🔍 Backend Search & Pagination
* 🌙 Dark/Light Mode
* ✏ Edit Question Feature

📌 Note
This project is built as a **full-stack learning project** and demonstrates real-world application architecture using MERN stack.
