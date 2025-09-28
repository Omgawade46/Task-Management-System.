const bcrypt = require("bcryptjs");
const { sql } = require("../config/db");
const generateToken = require("../utils/generateToken");

// Register
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  

  try {
    await sql.query`
      INSERT INTO Users (Name, Email, PasswordHash, CreatedAt)
      VALUES (${name}, ${email}, ${hashedPassword}, GETDATE())
    `;
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await sql.query`SELECT * FROM Users WHERE Email = ${email}`;
    const user = result.recordset[0];

    if (user && (await bcrypt.compare(password, user.PasswordHash))) {
      res.json({ token: generateToken(user.UserId) });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerUser, loginUser };
