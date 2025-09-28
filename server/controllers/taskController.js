const { sql } = require("../config/db");

// Get all tasks for logged-in user
const getTasks = async (req, res) => {
  try {
    const result = await sql.query`
      SELECT 
        TaskId as taskId,
        Title as title,
        Description as description,
        DueDate as dueDate,
        Priority as priority,
        Status as status
      FROM Tasks 
      WHERE UserId = ${req.user.id}
    `;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new task
const addTask = async (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;

  try {
    await sql.query`
      INSERT INTO Tasks (UserId, Title, Description, DueDate, Priority, Status, CreatedAt)
      VALUES (${req.user.id}, ${title}, ${description}, ${dueDate}, ${priority}, ${status}, GETDATE())
    `;
    res.status(201).json({ message: "Task created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await sql.query`
      DELETE FROM Tasks
      WHERE TaskId = ${id} AND UserId = ${req.user.id}
    `;

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



const updateTask = async (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;
  const { id } = req.params;

  try {
    const result = await sql.query`
      UPDATE Tasks
      SET Title = ${title},
          Description = ${description},
          DueDate = ${dueDate},
          Priority = ${priority},
          Status = ${status}
      WHERE TaskId = ${id} AND UserId = ${req.user.id}
    `;

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getTasks, addTask, deleteTask, updateTask };
