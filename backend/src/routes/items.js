import express from "express";
import Item from "../models/Item.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Create item
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, location, status, imageUrl, date } = req.body || {};
    const item = await Item.create({
      title,
      description,
      location,
      status: status || "lost",
      imageUrl,
      date: date || new Date(),
      owner: req.user.id
    });
    res.status(201).json(item);
  } catch {
    res.status(500).json({ message: "Failed to create item" });
  }
});

// List items (optional query: status, q)
router.get("/", async (req, res) => {
  try {
    const { status, q } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (q) filter.title = { $regex: q, $options: "i" };
    const items = await Item.find(filter).populate("owner", "name email").sort({ createdAt: -1 });
    res.json(items);
  } catch {
    res.status(500).json({ message: "Failed to fetch items" });
  }
});

// Get item by id
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate("owner", "name email");
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch {
    res.status(500).json({ message: "Failed to fetch item" });
  }
});

// Update (owner only)
router.put("/:id", auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    if (item.owner.toString() !== req.user.id) return res.status(403).json({ message: "Forbidden" });

    const updatable = ["title", "description", "location", "status", "imageUrl", "date"];
    updatable.forEach((k) => {
      if (req.body[k] !== undefined) item[k] = req.body[k];
    });
    await item.save();
    res.json(item);
  } catch {
    res.status(500).json({ message: "Failed to update item" });
  }
});

// Delete (owner only)
router.delete("/:id", auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    if (item.owner.toString() !== req.user.id) return res.status(403).json({ message: "Forbidden" });

    await item.deleteOne();
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete item" });
  }
});

export default router;
