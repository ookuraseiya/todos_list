import { Request, Response } from "express";
import { uid } from "uid";

const todoModel = require("../models/todoModel");

const todoController = {
  async getAllTodos(req: Request, res: Response) {
    try {
      const todos = await todoModel.getTodos();
      res.status(200).json({ todos });
    } catch (error) {
      res.status(500).json({ message: "Failed to get todo" });
    }
  },

  async createTodo(req: Request, res: Response) {
    const { todo } = req.body.data;
    const id = uid();
    try {
      await todoModel.addTodo(id, todo);
      res.status(200).json({ id, todo });
    } catch (error) {
      res.status(500).json({ message: "Failed to add todo" });
    }
  },

  async removeTodo(req: Request, res: Response) {
    const { id } = req.body;
    try {
      await todoModel.deleteTodo(id);
      res.status(200).json({ message: "Success" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete todo" });
    }
  },

  async updateTodoItem(req: Request, res: Response) {
    const { id, todo } = req.body.data;
    try {
      await todoModel.updateTodo(id, todo);
      res.status(200).json({ id, todo });
    } catch (error) {
      res.status(500).json({ message: "Failed to update todo" });
    }
  },
}

module.exports = todoController;