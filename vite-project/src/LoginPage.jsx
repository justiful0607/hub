import { useState } from "react";

const API_URL = "http://localhost:5000/api";

function LoginPage({ onLogin }) {
  const [role, setRole] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // ADMIN LOGIN
      if (role === "admin") {
        if (
          email === "admin@carehub.demo" &&
          password === "admin123"
        ) {
          onLogin("admin", {
            name: "CareHub Admin",
            email: email,
          });

          return;
        }

        setError("Invalid admin email or password.");
        return;
      }

      // PATIENT LOGIN
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Invalid email or password.");
        return;
      }

      // Send patient data to App.jsx
      onLogin("patient", data);

    } catch (err) {
      console.error(err);
      setError(
        "Unable to connect to the CareHub server. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* Logo / Heading */}
        <div style={styles.header}>
          <div style={styles.logo}>❤</div>

          <h1 style={styles.title}>CareHub</h1>

          <p style={styles.subtitle}>
            Your healthcare, all in one place
          </p>
        </div>

        {/* Role Selection */}
        <div style={styles.roleContainer}>
          <button
            type="button"
            onClick={() => {
              setRole("patient");
              setError("");
            }}
            style={{
              ...styles.roleButton,
              ...(role === "patient" ? styles.activeRole : {}),
            }}
          >
            Patient
          </button>

          <button
            type="button"
            onClick={() => {
              setRole("admin");
              setError("");
            }}
            style={{
              ...styles.roleButton,
              ...(role === "admin" ? styles.activeRole : {}),
            }}
          >
            Admin
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>

          <label style={styles.label}>
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <label style={styles.label}>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          {/* Error */}
          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={styles.loginButton}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Admin credentials */}
        {role === "admin" && (
          <div style={styles.adminInfo}>
            <strong>Admin Demo Login</strong>
            <br />
            Email: admin@carehub.demo
            <br />
            Password: admin123
          </div>
        )}

        {role === "patient" && (
          <p style={styles.footerText}>
            Login using the patient account registered in CareHub.
          </p>
        )}

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f8f7",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#ffffff",
    padding: "40px",
    borderRadius: "18px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
  },

  header: {
    textAlign: "center",
    marginBottom: "28px",
  },

  logo: {
    width: "60px",
    height: "60px",
    margin: "0 auto 12px",
    borderRadius: "50%",
    background: "#1fa67a",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
  },

  title: {
    margin: "0",
    fontSize: "32px",
    color: "#174c3d",
  },

  subtitle: {
    marginTop: "8px",
    color: "#777",
    fontSize: "14px",
  },

  roleContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "25px",
  },

  roleButton: {
    flex: 1,
    padding: "12px",
    border: "1px solid #d5d5d5",
    borderRadius: "8px",
    background: "#ffffff",
    cursor: "pointer",
    fontSize: "15px",
  },

  activeRole: {
    background: "#1fa67a",
    color: "white",
    borderColor: "#1fa67a",
  },

  label: {
    display: "block",
    marginBottom: "7px",
    marginTop: "15px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#333",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px",
    border: "1px solid #d6d6d6",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none",
  },

  loginButton: {
    width: "100%",
    marginTop: "25px",
    padding: "14px",
    border: "none",
    borderRadius: "8px",
    background: "#1fa67a",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },

  error: {
    marginTop: "15px",
    padding: "10px",
    borderRadius: "7px",
    background: "#ffecec",
    color: "#c62828",
    fontSize: "14px",
  },

  adminInfo: {
    marginTop: "20px",
    padding: "12px",
    background: "#f1f7f5",
    borderRadius: "8px",
    fontSize: "13px",
    lineHeight: "1.6",
    color: "#456",
  },

  footerText: {
    textAlign: "center",
    color: "#888",
    fontSize: "13px",
    marginTop: "20px",
  },
};

export default LoginPage;