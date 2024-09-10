import express, { Application } from "express";
import cors from "cors";

const router = require('./routes/todoRoutes');
const app: Application = express();
const PORT = 3000;

app.use(cors({ origin: "http://localhost:5174" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/todos", router);

try {
  app.listen(PORT, () => {
    console.log(`server running at://localhost:${PORT}`);
  });
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}