import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16 }}>
      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.title}
          style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 6, marginBottom: 8 }}
        />
      )}
      <h3 style={{ margin: "8px 0" }}>{item.title}</h3>
      <p style={{ margin: "4px 0", color: "#666" }}>{item.location}</p>
      <p style={{ margin: "4px 0" }}>{item.description?.slice(0, 100)}</p>
      <p style={{ fontSize: 12, color: "#555" }}>Status: {item.status}</p>
      <Link to={`/items/${item._id}`}>View details</Link>
    </div>
  );
};

export default ItemCard;
