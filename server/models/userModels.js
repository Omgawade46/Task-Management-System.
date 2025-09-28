const { sql } = require("../config/db");

// Find user by email
const findUserByEmail = async (email) => {
  const result = await sql.query`
    SELECT * FROM Users WHERE Email = ${email}
  `;
  return result.recordset[0];
};

// Find user by ID
const findUserById = async (id) => {
  const result = await sql.query`
    SELECT * FROM Users WHERE UserId = ${id}
  `;
  return result.recordset[0];
};

// Create new user
const createUser = async (name, email, passwordHash) => {
  await sql.query`
    INSERT INTO Users (Name, Email, PasswordHash, CreatedAt)
    VALUES (${name}, ${email}, ${passwordHash}, GETDATE())
  `;
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
};
