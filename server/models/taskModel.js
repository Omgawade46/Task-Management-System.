// const { sql } = require("../config/db");

// // Get all tasks for a user
// const getTasksByUser = async (userId) => {
//   const result = await sql.query`
//     SELECT * FROM Tasks WHERE UserId = ${userId}
//   `;
//   return result.recordset;
// };

// // Get a single task
// const getTaskById = async (taskId, userId) => {
//   const result = await sql.query`
//     SELECT * FROM Tasks WHERE TaskId = ${taskId} AND UserId = ${userId}
//   `;
//   return result.recordset[0];
// };

// // Create new task
// const createTask = async (userId, title, description, dueDate, priority, status) => {
//   await sql.query`
//     INSERT INTO Tasks (UserId, Title, Description, DueDate, Priority, Status, CreatedAt)
//     VALUES (${userId}, ${title}, ${description}, ${dueDate}, ${priority}, ${status}, GETDATE())
//   `;
// };

// // Update task
// const updateTask = async (taskId, userId, title, description, dueDate, priority, status) => {
//   await sql.query`
//     UPDATE Tasks
//     SET Title = ${title}, Description = ${description}, DueDate = ${dueDate},
//         Priority = ${priority}, Status = ${status}
//     WHERE TaskId = ${taskId} AND UserId = ${userId}
//   `;
// };

// // Delete task
// const deleteTask = async (taskId, userId) => {
//   await sql.query`
//     DELETE FROM Tasks WHERE TaskId = ${taskId} AND UserId = ${userId}
//   `;
// };

// module.exports = {
//   getTasksByUser,
//   getTaskById,
//   createTask,
//   updateTask,
//   deleteTask,
// };
