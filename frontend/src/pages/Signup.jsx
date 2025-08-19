import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await signup(form.name, form.email, form.password);
      navigate("/");
    } catch (e) {
      setErr(e.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "48px auto" }}>
      <h2>Signup</h2>
      {err && <div style={{ color: "red", marginBottom: 8 }}>{err}</div>}
      <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <button type="submit">Create account</button>
      </form>
      <p style={{ marginTop: 8 }}>
        Have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
