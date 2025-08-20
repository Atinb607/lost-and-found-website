// src/pages/Auth.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Auth() {
  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    roll: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      if (mode === "login") {
        await login(form.email, form.password);
      } else {
        await signup(form.name, form.roll, form.email, form.password);
      } // ← Fixed: Added missing closing brace
      
      navigate("/");
    } catch (error) {
      setErr(error?.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setErr("");
    setForm({ name: "", roll: "", email: "", password: "" });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black"
    >
      <motion.form
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-md mx-4 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-8"
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-gray-400 text-sm">
            {mode === "login"
              ? "Sign in to your account"
              : "Sign up to get started"}
          </p>
        </div>

        {err && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6"
          >
            <p className="text-red-400 text-sm text-center">{err}</p>
          </motion.div>
        )}

        <div className="space-y-5">
          {mode === "signup" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-200"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Roll Number"
                  name="roll"
                  value={form.roll}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-200"
                />
              </div>
            </motion.div>
          )}

          <div>
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-200"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-200"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Processing...</span>
            </div>
          ) : (
            mode === "login" ? "Sign In" : "Create Account"
          )}
        </button>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors duration-200"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors duration-200"
                >
                  Sign In
                </button>
              </>
            )}
          </p>
        </div>
      </motion.form>
    </motion.div>
  );
}
