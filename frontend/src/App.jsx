import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

// Pages
import Auth from "./pages/Auth"; 
import Dashboard from "./pages/Dashboard";
import ReportItem from "./pages/ReportItem";
import ItemDetails from "./pages/ItemDetails";
import NotFound from "./pages/NotFound";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/auth";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/report"
              element={
                <ProtectedRoute>
                  <ReportItem />
                </ProtectedRoute>
              }
            />
            <Route
              path="/item/:id"
              element={
                <ProtectedRoute>
                  <ItemDetails />
                </ProtectedRoute>
              }
            />

            {/* Auth Route (combined login/signup) */}
            <Route path="/auth" element={<Auth />} />

            {/* Fallback NotFound Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
