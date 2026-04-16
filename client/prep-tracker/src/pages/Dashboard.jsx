import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import QuestionList from "../components/QuestionList";
import AddQuestion from "../components/AddQuestion";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [questions, setQuestions] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");

  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({
    username: "",
    bio: ""
  });

  const token = localStorage.getItem("token");

  // 🔐 FETCH USER
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/user/profile",
          { headers: { Authorization: token } }
        );

        setUser(res.data);

        // ✅ IMPORTANT FIX
        setEditData({
          username: res.data.username || "",
          bio: res.data.bio || ""
        });

      } catch {
        navigate("/login");
      }
    };

    fetchUser();
  }, []);

  // 📊 FETCH QUESTIONS
  const fetchQuestions = async () => {
    const res = await axios.get(
      "http://localhost:5000/questions",
      { headers: { Authorization: token } }
    );
    setQuestions(res.data);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // 🔄 UPDATE PROFILE
  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/user/update",
        editData,
        { headers: { Authorization: token } }
      );

      setUser(res.data);
      setShowEdit(false);

    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={container}>

      {/* NAVBAR */}
      <div style={navbar}>
        <h2>🚀 Preparation Tracker</h2>

        <div style={navButtons}>
          <button style={btn} onClick={() => setActiveTab("dashboard")}>Dashboard</button>
          <button style={btn} onClick={() => setActiveTab("questions")}>Questions</button>
          <button style={btn} onClick={() => setActiveTab("add")}>Add</button>
          <button style={btn} onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* DASHBOARD */}
      {activeTab === "dashboard" && (
        <>
          <div style={card}>
            <h2>👤 Profile</h2>

            <p><b>Name:</b> {user.username}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Bio:</b> {user.bio || "No bio added"}</p>

            <button style={btn} onClick={() => setShowEdit(true)}>
              Edit Profile
            </button>
          </div>

          <div style={analytics}>
            <div style={statCard}>
              <h3>Total</h3>
              <p>{questions.length}</p>
            </div>

            <div style={statCard}>
              <h3>Solved</h3>
              <p>{questions.filter(q => q.status === "Solved").length}</p>
            </div>

            <div style={statCard}>
              <h3>Pending</h3>
              <p>{questions.filter(q => q.status === "Pending").length}</p>
            </div>
          </div>
        </>
      )}

      {/* QUESTIONS */}
      {activeTab === "questions" && (
        <QuestionList questions={questions} fetchQuestions={fetchQuestions} />
      )}

      {/* ADD */}
      {activeTab === "add" && (
        <AddQuestion fetchQuestions={fetchQuestions} onSuccess={() => setActiveTab("questions")} />
      )}

      {/* ✏ EDIT MODAL */}
      {showEdit && (
        <div style={overlay}>
          <div style={modal}>
            <h3>Edit Profile</h3>

            <input
              style={input}
              placeholder="Name"
              value={editData.username}
              onChange={(e) =>
                setEditData({ ...editData, username: e.target.value })
              }
            />

            <textarea
              style={textarea}
              placeholder="Bio"
              value={editData.bio}
              onChange={(e) =>
                setEditData({ ...editData, bio: e.target.value })
              }
            />

            <div style={btnGroup}>
              <button style={btn} onClick={handleUpdate}>Save</button>
              <button style={cancelBtn} onClick={() => setShowEdit(false)}>
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

const container = {
  minHeight: "100vh",
  background: "#0f172a",
  color: "white",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

const navbar = {
  width: "100%",
  maxWidth: "1000px",
  display: "flex",
  justifyContent: "space-between",
  padding: "15px 20px",
  background: "#1e293b",
  borderRadius: "10px",
  marginBottom: "25px"
};

const navButtons = {
  display: "flex",
  gap: "10px"
};

const btn = {
  padding: "8px 12px",
  background: "#6366f1",
  border: "none",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer"
};

const cancelBtn = {
  padding: "8px 12px",
  background: "#ef4444",
  border: "none",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer"
};

const card = {
  width: "100%",
  maxWidth: "1000px",
  background: "#1e293b",
  padding: "25px",
  borderRadius: "12px",
  marginBottom: "20px"
};

const analytics = {
  width: "100%",
  maxWidth: "1000px",
  display: "flex",
  gap: "20px"
};

const statCard = {
  flex: 1,
  padding: "25px",
  background: "#1e293b",
  borderRadius: "12px",
  textAlign: "center"
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
  alignItems: "center"
};

const modal = {
  background: "#1e293b",
  padding: "25px",
  borderRadius: "12px",
  width: "400px",
  display: "flex",
  flexDirection: "column",
  gap: "15px"
};

const input = {
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  background: "#0f172a",
  color: "white"
};

const textarea = {
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  background: "#0f172a",
  color: "white",
  minHeight: "100px"
};

const btnGroup = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px"
};

export default Dashboard;