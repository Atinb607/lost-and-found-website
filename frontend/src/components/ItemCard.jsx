import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ItemCard = ({ item }) => {
  const statusColors = {
    lost: "from-red-500/20 to-red-600/20 border-red-500/30",
    found: "from-green-500/20 to-green-600/20 border-green-500/30"
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-200"
    >
      <Link to={`/items/${item._id}`} className="block">
        {/* Image placeholder or actual image */}
        <div className="w-full h-48 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl mb-4 flex items-center justify-center">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <div className="text-gray-400 text-4xl">📦</div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-white line-clamp-2">
            {item.title}
          </h3>
          
          <div className="flex items-center text-gray-400 text-sm">
            <span className="mr-1">📍</span>
            {item.location}
          </div>

          <p className="text-gray-300 text-sm line-clamp-3">
            {item.description?.slice(0, 100)}
            {item.description?.length > 100 && "..."}
          </p>

          {/* Status Badge */}
          <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${statusColors[item.status]} text-white`}>
            Status: {item.status}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ItemCard;
