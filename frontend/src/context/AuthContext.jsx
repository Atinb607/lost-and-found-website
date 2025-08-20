import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const fetchMe = async () => {
    try {
      const { data } = await api.get("/auth/me");
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setInitializing(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const signup = async (name, roll, email, password) => {
    console.log("🔐 AuthContext signup called with:");
    console.log("- name:", name);
    console.log("- roll:", roll);  
    console.log("- email:", email);
    console.log("- password:", password ? "exists" : "missing");
    
    try {
      const requestData = { name, roll, email, password };
      console.log("📤 Sending signup request with data:", requestData);
      
      const response = await api.post("/auth/signup", requestData);
      
      console.log("✅ Signup successful:", response.data);
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      console.error("❌ Signup error:", error);
      console.error("❌ Error response:", error.response?.data);
      throw error;
    }
  };

  const logout = async () => {
    await api.post("/auth/logout");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, initializing, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
