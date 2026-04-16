import { useState } from "react";
import axios from "axios";

function AddQuestion({ fetchQuestions, onSuccess }) {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    difficulty: "",
    topic: "",
    status: "",
    strategy: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/questions", form, {
      headers: { Authorization: token }
    });

    fetchQuestions();
    onSuccess();

    setForm({
      title: "",
      difficulty: "",
      topic: "",
      status: "",
      strategy: ""
    });
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={heading}>➕ Add Question</h2>

        <form onSubmit={handleSubmit} style={formStyle}>

          <input
            name="title"
            placeholder="Question Title"
            value={form.title}
            onChange={handleChange}
            style={input}
          />

          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
            style={input}
          >
            <option value="">Select Difficulty</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

          <input
            name="topic"
            placeholder="Topic (e.g. Arrays, DP)"
            value={form.topic}
            onChange={handleChange}
            style={input}
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            style={input}
          >
            <option value="">Select Status</option>
            <option>Solved</option>
            <option>Failed</option>
            <option>Pending</option>
            <option>Revision Required </option>
          </select>

          <textarea
            name="strategy"
            placeholder="Write your approach / strategy..."
            value={form.strategy}
            onChange={handleChange}
            style={textarea}
          />

          <button type="submit" style={button}>
            Add Question
          </button>

        </form>
      </div>
    </div>
  );
}

/* 🎨 STYLES */

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "70vh"
};

const card = {
  background: "#1e293b",
  padding: "30px",
  borderRadius: "12px",
  width: "400px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
};

const heading = {
  textAlign: "center",
  marginBottom: "20px"
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px"
};

const input = {
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  outline: "none",
  background: "#0f172a",
  color: "white"
};

const textarea = {
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  outline: "none",
  background: "#0f172a",
  color: "white",
  minHeight: "100px",
  resize: "none"
};

const button = {
  padding: "12px",
  borderRadius: "6px",
  border: "none",
  background: "#6366f1",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.2s"
};

export default AddQuestion;