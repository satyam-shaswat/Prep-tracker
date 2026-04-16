import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [step, setStep] = useState(1); // 👈 step-based like Google
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step === 1) setStep(2);
    else handleSubmit();
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={container}>
      <div style={card}>

        {/* LEFT SIDE */}
        <div style={left}>
          <h1 style={{ fontSize: "28px"  , color: "#060505"}}>Sign in</h1>
          <p style={{ color: "#060505", marginTop: "10px" }}>
            Use your account to continue
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div style={right}>

          {step === 1 && (
            <>
              <input
                name="email"
                placeholder="Email or phone"
                style={input}
                onChange={handleChange}
              />
            </>
          )}

          {step === 2 && (
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              style={input}
              onChange={handleChange}
            />
          )}

          <div style={bottom}>
            <Link to="/signup">
                        <span style={link}>Create account</span></Link>

            <button style={button} onClick={handleNext}>
              {step === 1 ? "Next" : "Login"}
            </button>
            
          </div>

        </div>
      </div>
    </div>
  );
}

/* STYLES */

const container = {
  height: "100vh",
  background: "linear-gradient(135deg, #6a62f5, #925bf1)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Segoe UI"
};

const card = {
  width: "700px",
  height: "300px",
  background: "#fffbfb8e",
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
  justifyContent: "center"
};

const input = {
  padding: "12px",
  background: "transparent",
  border: "1px solid #070606",
  borderRadius: "6px",
  color: "black",
  marginBottom: "10px"
};

const button = {
  padding: "10px 20px",
  background: "#4189fc",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer"
};

const link = {
  color: "#0040a8",
  fontSize: "14px",
  cursor: "pointer"
};

const bottom = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "20px"
};

export default Login;