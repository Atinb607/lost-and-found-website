import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchItem = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/items/${id}`);
      setItem(data);
    } catch {
      setErr("Failed to load item");
    } finally {
      setLoading(false);
    }
  };

  const remove = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    
    try {
      await api.delete(`/items/${id}`);
      navigate("/");
    } catch (e) {
      setErr(e.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center max-w-md"
        >
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-red-400 mb-2">Error</h2>
          <p className="text-gray-300">{err}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-gray-400 text-lg">Item not found</div>
      </div>
    );
  }

  const statusColors = {
    lost: "from-red-500/20 to-red-600/20 border-red-500/30 text-red-300",
    found: "from-green-500/20 to-green-600/20 border-green-500/30 text-green-300"
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-8"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all duration-200"
            >
              ← Back
            </button>
            
            <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${statusColors[item.status]} font-medium`}>
              {item.status.toUpperCase()}
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image */}
            <div className="w-full h-64 lg:h-80 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="text-gray-400 text-6xl">📦</div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{item.title}</h1>
                <div className="flex items-center text-gray-400 text-lg">
                  <span className="mr-2">📍</span>
                  {item.location}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </div>

              {item.owner && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Contact Information</h3>
                  <div className="bg-white/5 rounded-xl p-4 space-y-2">
                    <p className="text-gray-300">
                      <span className="font-medium">Name:</span> {item.owner.name}
                    </p>
                    <p className="text-gray-300">
                      <span className="font-medium">Email:</span> {item.owner.email}
                    </p>
                    {item.owner.roll && (
                      <p className="text-gray-300">
                        <span className="font-medium">Roll:</span> {item.owner.roll}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => navigate(`/items/${id}/edit`)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Edit
                </button>
                <button
                  onClick={remove}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ItemDetails;
