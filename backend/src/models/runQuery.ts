import env from "dotenv";

env.config();

const mysql = require('mysql2/promise');

const config = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

const runQuery = async (query: string, values: any[] = []) => {
  try {
    const connection = await mysql.createConnection(config);
    const [rows] = await connection.execute(query, values);
    await connection.end();
    return rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
};

module.exports = runQuery;