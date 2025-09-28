const sql = require("mssql");
const dotenv = require("dotenv");


dotenv.config();
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  options: {
    encrypt: true, 
    trustServerCertificate: true,
  }, 
};   


 
const connectDB = async () => {
  try { 
    await sql.connect(config);
    // console.log("DB_HOST raw:", process.env.DB_HOST);

    console.log("MSSQL Connected");
  } catch (err) {
    console.error("DB Connection Failed:", err.message);
  }
};

module.exports = { sql, connectDB };
