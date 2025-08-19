import { useEffect, useState } from "react";
import api from "../api/axios";
import ItemCard from "../components/ItemCard";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");

  const fetchItems = async (params = {}) => {
    const { data } = await api.get("/items", { params });
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const search = () => fetchItems({ q, status: status || undefined });

  return (
    <div style={{ maxWidth: 1100, margin: "16px auto", padding: "0 16px" }}>
      <h2>Dashboard</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input placeholder="Search items..." value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
          <option value="claimed">Claimed</option>
        </select>
        <button onClick={search}>Search</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {items.map((it) => (
          <ItemCard key={it._id} item={it} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
