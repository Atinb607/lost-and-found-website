import { useState } from "react";

const ItemForm = ({ onSubmit, initial = {} }) => {
  const [form, setForm] = useState({
    title: initial.title || "",
    description: initial.description || "",
    location: initial.location || "",
    status: initial.status || "lost",
    imageUrl: initial.imageUrl || ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 12, maxWidth: 520 }}>
      <input name="title" placeholder="Item title" value={form.title} onChange={handleChange} required />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="lost">Lost</option>
        <option value="found">Found</option>
        <option value="claimed">Claimed</option>
      </select>
      <textarea name="description" placeholder="Description" rows={5} value={form.description} onChange={handleChange} />
      <input name="imageUrl" placeholder="Image URL (optional)" value={form.imageUrl} onChange={handleChange} />
      <button type="submit">Save</button>
    </form>
  );
};

export default ItemForm;
