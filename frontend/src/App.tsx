import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  IconButton,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

type TodoTypes = {
  id: string;
  todo: string;
};

type ChangeTodoTypes = {
  todo: string;
  editTodoName: string;
};

function App() {
  const { register, handleSubmit, reset } = useForm<ChangeTodoTypes>();
  const [todos, setTodos] = useState<TodoTypes[]>([]);
  const [isEdit, setIsEdit] = useState({ id: '', todo: '' });

  const addTodo = async (event: ChangeTodoTypes) => {
    const { todo } = event;
    await axios
      .post('http://localhost:3000/add', {
        data: {
          todo,
        },
      })
      .then((response) => {
        const todo = response.data;
        setTodos((preTodos) => [todo, ...preTodos]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTodo = async (id: string) => {
    console.log(id);

    await axios
      .delete('http://localhost:3000/delete', {
        data: {
          id,
        },
      })
      .then(() => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
      })
      .catch((e) => {
        console.log(e.message);
        setTodos(todos);
      });
  };

  const editTodo = async ({ editTodoName }: ChangeTodoTypes) => {
    await axios
      .put('http://localhost:3000/update', {
        data: {
          id: isEdit.id,
          todo: editTodoName,
        },
      })
      .then((response) => {
        const newTodos = todos.map((todo) => {
          return todo.id === response.data.id ? response.data : todo;
        });
        setIsEdit({ id: '', todo: '' });
        setTodos(newTodos);
        reset();
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  useEffect(() => {
    axios.get('http://localhost:3000').then((response) => {
      const { todos } = response.data;
      setTodos(todos);
    });
  }, []);

  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" align="center">
            TodoList
          </Typography>
          <form onSubmit={handleSubmit(addTodo)}>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <TextField
                {...register('todo')}
                type="text"
                label="New Todo"
                variant="outlined"
                required
                fullWidth
              />
              <IconButton type="submit" color="primary" aria-label="add todo">
                <Add />
              </IconButton>
            </Box>
          </form>
          <Box sx={{ mt: 3 }}>
            {todos.map((todo) => (
              <Card key={todo.id} sx={{ mb: 2 }}>
                <CardContent>
                  {isEdit.id === todo.id ? (
                    <form onSubmit={handleSubmit(editTodo)}>
                      <TextField
                        {...register('editTodoName')}
                        type="text"
                        defaultValue={todo.todo}
                        variant="standard"
                        fullWidth
                      />
                    </form>
                  ) : (
                    <Typography variant="body1">{todo.todo}</Typography>
                  )}
                </CardContent>
                <CardActions>
                  {isEdit.id === todo.id ? (
                    <Button
                      type="submit"
                      color="primary"
                      onClick={handleSubmit(editTodo)}
                    >
                      Edit
                    </Button>
                  ) : (
                    <IconButton
                      color="primary"
                      onClick={() =>
                        setIsEdit({ id: todo.id, todo: todo.todo })
                      }
                    >
                      <Edit />
                    </IconButton>
                  )}
                  <IconButton
                    color="secondary"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default App;
