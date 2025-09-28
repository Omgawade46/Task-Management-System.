const express = require("express");
const { getTasks, addTask,deleteTask,updateTask } = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getTasks);
router.post("/", protect, addTask);
router.delete("/:id", protect, deleteTask);
router.put("/:id", protect, updateTask);
module.exports = router;
