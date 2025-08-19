import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [err, setErr] = useState("");

  const fetchItem = async () => {
    try {
      const { data } = await api.get(`/items/${id}`);
      setItem(data);
    } catch {
      setErr("Failed to load item");
    }
  };

  const remove = async () => {
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

  if (err) return <div style={{ color: "red" }}>{err}</div>;
  if (!item) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 840, margin: "24px auto", padding: "0 16px" }}>
      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.title}
          style={{ width: "100%", maxHeight: 360, objectFit: "cover", borderRadius: 8 }}
        />
      )}
      <h2 style={{ marginTop: 12 }}>{item.title}</h2>
      <p><b>Status:</b> {item.status}</p>
      <p><b>Location:</b> {item.location}</p>
      <p><b>Description:</b> {item.description}</p>
      <p><b>Posted by:</b> {item.owner?.name} ({item.owner?.email})</p>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => navigate("/")}>Back</button>
        <button onClick={remove}>Delete (owner only)</button>
      </div>
    </div>
  );
};

export default ItemDetails;
