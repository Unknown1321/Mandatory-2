import mysql from "mysql2/promise";
require('dotenv').config();

const db = mysql.createPool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10, // Adjust the limit based on your requirements
});

export default db;

