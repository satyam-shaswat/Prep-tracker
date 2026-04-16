import axios from "axios";
import { useState } from "react";

function QuestionList({ questions, fetchQuestions }) {
  const token = localStorage.getItem("token");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [strategy, setStrategy] = useState("");

  const deleteQuestion = async (id) => {
    await axios.delete(`http://localhost:5000/questions/${id}`, {
      headers: { Authorization: token }
    });
    fetchQuestions();
  };

  const openStrategy = (q) => {
    setSelected(q);
    setStrategy(q.strategy || "");
  };

  const saveStrategy = async () => {
    await axios.put(
      `http://localhost:5000/questions/${selected._id}`,
      { strategy },
      { headers: { Authorization: token } }
    );
    setSelected(null);
    fetchQuestions();
  };

  const getDifficultyStyle = (level) => {
    if (level === "Easy") return { color: "#22c55e", fontWeight: "bold" };
    if (level === "Medium") return { color: "#facc15", fontWeight: "bold" };
    if (level === "Hard") return { color: "#ef4444", fontWeight: "bold" };
    return {};
  };

  const filtered = questions
    .filter((q) =>
      q.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((q) => filter === "All" || q.difficulty === filter);

  return (
    <div style={wrapper}>
      <h2 style={heading}>Your Questions</h2>

      {/* 🔍 SEARCH + FILTER */}
      <div style={controls}>
        <input
          style={input}
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          style={input}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      {/* 📋 TABLE */}
      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Title</th>
            <th style={th}>Difficulty</th>
            <th style={th}>Topic</th>
            <th style={th}>Status</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((q) => (
            <tr key={q._id} style={row}>
              <td style={td}>{q.title}</td>
              <td style={{ ...td, ...getDifficultyStyle(q.difficulty) }}>
                {q.difficulty}
              </td>
              <td style={td}>{q.topic}</td>
              <td style={td}>{q.status}</td>

              <td style={td}>
                <div style={actionBox}>
                  <button
                    style={iconBtn}
                    onClick={() => openStrategy(q)}
                  >
                    🧠
                  </button>

                  <button
                    style={deleteBtn}
                    onClick={() => deleteQuestion(q._id)}
                  >
                    ✕
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🧠 MODAL */}
      {selected && (
        <div style={overlay}>
          <div style={modal}>
            <h3>{selected.title}</h3>

            <textarea
              style={textarea}
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
              placeholder="Write your strategy..."
            />

            <div style={modalButtons}>
              <button style={saveBtn} onClick={saveStrategy}>
                Save
              </button>
              <button style={cancelBtn} onClick={() => setSelected(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* 🎨 STYLES */

const wrapper = {
  maxWidth: "1000px",
  margin: "0 auto",
};

const heading = {
  marginBottom: "15px",
};

const controls = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
};

const input = {
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  background: "#1e293b",
  color: "white",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#1e293b",
  borderRadius: "10px",
  overflow: "hidden",
};

const th = {
  textAlign: "left",
  padding: "15px",
  color: "#94a3b8",
  borderBottom: "1px solid #334155",
};

const td = {
  padding: "15px",
  borderBottom: "1px solid #334155",
};

const row = {
  textAlign: "left",
};

const actionBox = {
  display: "flex",
  gap: "8px",
};

const iconBtn = {
  background: "#334155",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
  cursor: "pointer",
  color: "white",
};

const deleteBtn = {
  background: "#ef4444",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
  cursor: "pointer",
  color: "white",
};

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modal = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "10px",
  width: "600px",
};

const textarea = {
  width: "98%",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "6px",
  border: "none",
  background: "#0f172a",
  color: "white",
  minHeight: "100px",
};

const modalButtons = {
  marginTop: "10px",
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
};

const saveBtn = {
  background: "#6366f1",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer",
};

const cancelBtn = {
  background: "#ef4444",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer",
};

export default QuestionList;