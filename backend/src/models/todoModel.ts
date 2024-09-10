const executeQuery = require("./runQuery");

const todoModel = {
  async getTodos() {
    const sql = "SELECT * FROM todo";
    return await executeQuery(sql);
  },

  async addTodo(id: string, todo: string) {
    const sql = "INSERT INTO todo (id, todo) VALUES (?, ?)";
    return await executeQuery(sql, [id, todo]);
  },

  async deleteTodo(id: string) {
    const sql = "DELETE FROM todo WHERE id = ?";
    return await executeQuery(sql, [id]);
  },

  async updateTodo(id: string, todo: string) {
    const sql = "UPDATE todo SET todo = ? WHERE id = ?";
    return await executeQuery(sql, [todo, id]);
  },
}

module.exports = todoModel;

// async getTodos = async () => {
//   const sql = "SELECT * FROM todo";
//   return await executeQuery(sql);
// };

// async addTodo(id: string, todo: string) => {
//   const sql = "INSERT INTO todo (id, todo) VALUES (?, ?)";
//   return await executeQuery(sql, [id, todo]);
// };

// async deleteTodo(id: string) => {
//   const sql = "DELETE FROM todo WHERE id = ?";
//   return await executeQuery(sql, [id]);
// };

// async updateTodo(id: string, todo: string) => {
//   const sql = "UPDATE todo SET todo = ? WHERE id = ?";
//   return await executeQuery(sql, [todo, id]);
// };