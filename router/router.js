import express from "express";
import { registerUser, loginUser } from "../components/userlogic.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Note from "../module/note.js";

const router = express.Router();

// Auth
router.post("/register", registerUser);
router.post("/login", loginUser);

// Notes
router.post("/notes", authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  const note = await Note.create({ title, content, user: req.userId });
  res.status(201).json(note);
});

router.get("/notes", authMiddleware, async (req, res) => {
  const notes = await Note.find({ user: req.userId });
  res.json(notes);
});

router.put("/notes/:id", authMiddleware, async (req, res) => {
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    req.body,
    { new: true }
  );
  if (!note) return res.status(404).json({ message: "Note not found" });
  res.json(note);
});

router.delete("/notes/:id", authMiddleware, async (req, res) => {
  const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.userId });
  if (!note) return res.status(404).json({ message: "Note not found" });
  res.json({ message: "Note deleted" });
});

export default router;
