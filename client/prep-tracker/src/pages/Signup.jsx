import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
  try {
 const res = await axios.post(
  "http://localhost:5000/auth/signup",
  form
);

console.log(res.data);
alert(res.data.message);

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } else {
      alert(res.data.message);
    }
  } catch {
    alert("Login failed");
  }
};

  return (
    <div style={container}>
      <div style={card}>

        {/* LEFT */}
        <div style={left}>
          <h1 style={{ color: "#060505" }}>Create Account</h1>
          <p style={{ color: "#000000", marginTop: "10px" }}>
            Enter your details to get started
          </p>
        </div>

        {/* RIGHT */}
        <div style={right}>
          <input
            name="username"
            placeholder="Username"
            style={input}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            style={input}
            onChange={handleChange}
          />

          <div style={bottom}>
            <Link to="/login">
              <span style={link}>Already have account?</span>
            </Link>

            <button style={button} onClick={handleSubmit}>
              Signup
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

/* SAME STYLES AS LOGIN */

const container = {
  height: "100vh",
  background: "#fffbfb",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Segoe UI"
};

const card = {
  width: "700px",
  height: "240px",
  background: "#a7a6a6",
  borderRadius: "12px",
  display: "flex",
  padding: "40px",
  color: "white",
  boxShadow: "0 0 40px rgba(0,0,0,0.5)"
};

const left = {
  flex: 1
};

const right = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const input = {
  padding: "12px",
  background: "transparent",
  border: "1px solid #0f0202",
  borderRadius: "6px",
  color: "black"
};

const button = {
  padding: "10px 20px",
  background: "#3d84f8",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer"
};

const link = {
  color: "#4b8bf4",
  fontSize: "14px"
};

const bottom = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "20px"
};

export default Signup;