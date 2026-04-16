import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  return (
    <div style={container}>

      {/* HERO SECTION */}
      <div style={hero}>
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={title}
        >
          🚀 Preparation Tracker
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={subtitle}
        >
          Track your coding progress and crack interviews efficiently
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link to="/login">
            <motion.button style={primaryBtn} whileHover={{ scale: 1.08 }}>
              Get Strarted
            </motion.button>
          </Link>

        </motion.div>
      </div>

      {/* FEATURES */}
      <div style={cardContainer}>

        {cards.map((card, i) => (
          <motion.div
            key={i}
            style={cardStyle}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.3 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 12px 40px rgba(0,0,0,0.3)"
            }}
          >
            <div style={icon}>{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </motion.div>
        ))}

      </div>

    </div>
  );
}

/* DATA */

const cards = [
  {
    icon: "📊",
    title: "Track Progress",
    text: "Monitor solved and pending questions easily."
  },
  {
    icon: "🧠",
    title: "Organize Topics",
    text: "Group questions by difficulty and topics."
  },
  {
    icon: "🔐",
    title: "Secure Access",
    text: "Your data is protected with authentication."
  }
];

/* STYLES */

const container = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #6a62f5, #925bf1)",
  color: "white",
  fontFamily: "Segoe UI"
};

const hero = {
  textAlign: "center",
  padding: "80px 20px"
};

const title = {
  fontSize: "48px",
  fontWeight: "700",
  marginBottom: "10px"
};

const subtitle = {
  color: "#e0e7ff",
  marginBottom: "25px"
};

const primaryBtn = {
  padding: "10px 18px",
  background: "linear-gradient(135deg,  #0cdcf79f, #1e22ee)",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  boxShadow: "0 4px 15px rgba(99,102,241,0.5)"
};

const secondaryBtn = {
  padding: "10px 18px",
  background: "linear-gradient(135deg,  #0cdcf79f, #1e22ee)",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const cardContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  flexWrap: "wrap",
  padding: "20px"
};

const cardStyle = {
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(12px)",
  padding: "25px",
  borderRadius: "16px",
  width: "260px",
  textAlign: "center",
  boxShadow: "0 8px 30px rgba(0,0,0,0.2)"
};

const icon = {
  fontSize: "30px",
  marginBottom: "10px"
};

export default Home;