import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate("/auth");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-2xl font-bold text-white">UFound</span>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <Link
                  to="/report"
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
                >
                  Report Item
                </Link>
                
                <div className="flex items-center space-x-3">
                  <div className="text-gray-300 text-sm">
                    Welcome, <span className="font-medium text-white">{user.name}</span>
                  </div>
                  <button
                    onClick={onLogout}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-xl text-gray-300 hover:text-white transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}

            {!user && (
              <div className="flex items-center space-x-4">
                <Link
                  to="/auth"
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-xl text-gray-300 hover:text-white transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/auth"
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
