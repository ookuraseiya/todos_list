import express from "express";

const todoController = require("../controllers/todoController");
const router = express.Router();

router.get("/", todoController.getAllTodos);
router.post("/add", todoController.createTodo);
router.delete("/delete", todoController.removeTodo);
router.put("/update", todoController.updateTodoItem);

module.exports = router;