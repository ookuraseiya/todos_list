import express, { Application, Request, Response } from "express";
import mysql from "mysql2";
import cors from "cors";
import { uid } from "uid";
import env from "dotenv";

env.config();

const app: Application = express();
const PORT = 3000;

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  const sql = "SELECT * FROM todo";
  connection.query(sql, (error, result) => {
    if (error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(200).json({ todos: result });
    }
  });
});

app.post("/add", (req: Request, res: Response) => {
  const { todo } = req.body.data;
  const uidValue = uid();
  const sql = `INSERT INTO todo VALUES ("${uidValue}", "${todo}")`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Failed to add todo" });
    }
    return res.status(200).json({ id: uidValue, todo });
  })
});

app.delete("/delete", (req: Request, res: Response) => {
  const id = req.body.id;
  const sql = `DELETE FROM todo WHERE id = "${id}"`;
  connection.query(sql, (error) => {
    if (error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(200).json({ message: "success" });
    }
  });
});

app.put("/update", (req: Request, res: Response) => {
  const { id, todo } = req.body.data;
  const sql = `UPDATE todo SET todo="${todo}" WHERE id="${id}"`
  connection.query(sql, (error) => {
    if (error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(200).json({ id, todo });
    }
  });
});

try {
  app.listen(PORT, () => {
    console.log(`server running PORT:${PORT}`);
  });
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message);
  }
}