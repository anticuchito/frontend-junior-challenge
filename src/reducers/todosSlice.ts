import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

import { TodoStateType, TodoType } from '../store';

// type Todo ver mas adeltante como implementar las acciones
type NewTodoType = Pick<TodoType, 'label' | 'checked'>;

const InitialState: TodoStateType = {
  todos: [],
  countDone: 0,
  loading: false,
};

const baseUrl =
  'https://my-json-server.typicode.com/AlvaroArratia/static-todos-api';

export const getTodos = createAsyncThunk('todos/getTodos', async () => {
  const data = await axios.get(`${baseUrl}/todos`).then((res) => res.data);

  return data as TodoType[];
});

export const changeStatusTodo = createAsyncThunk(
  'todos/checkTodo',
  async (data: { id: string; checked: boolean }) => {
    const { id, checked } = data;

    const resp = await axios
      .patch(`${baseUrl}/todos/${id}`, { checked: checked })
      .then((res) => res.data);

    resp.checked = checked;

    return resp as TodoType;
  }
);
// ! this callEndoint is not working
export const deleteTodo = createAsyncThunk(
  'todo/deleteTodo',
  async (id: string) => {
    const resp = await axios.delete(`${baseUrl}/todos/${id}`);
    // .then((res) => res.data);

    //! id dont know how return is not working

    if (resp.status !== 200) return '';

    return id;
  }
);

export const createTodo = createAsyncThunk(
  'todo/createTodo',
  async (newTodo: NewTodoType) => {
    const resp = await axios
      .post(`${baseUrl}/todos`, newTodo)
      .then((res) => res.data);

    return resp as TodoType;
  }
);

export const todosSlice = createSlice({
  name: 'data',
  initialState: InitialState,
  reducers: {
    // reducers syncronous
  },

  extraReducers: (builder) => {
    builder.addCase(getTodos.fulfilled, (state, action) => {
      return {
        ...state,
        todos: action.payload,
      };
    });
    builder.addCase(getTodos.rejected, () => {
      toast.error('error al momento de cargar los todos ', {
        position: toast.POSITION.TOP_RIGHT,
      });
    });

    builder.addCase(changeStatusTodo.fulfilled, (state, action) => {
      const { id, checked } = action.payload;
      console.log(id, checked);
      const todoData = state.todos.find((todo) => todo.id === id);

      todoData.checked = checked;

      state.countDone = state.todos.filter((todo) => todo.checked).length;

      return state;
    });
    builder.addCase(changeStatusTodo.rejected, () => {
      toast.error('error al cambiar de estado el todo', {
        position: toast.POSITION.TOP_RIGHT,
      });
    });

    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      const id = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== id);
      return state;
    });

    builder.addCase(deleteTodo.rejected, () => {
      toast.error('error al momento de eliminar el todo ', {
        position: toast.POSITION.TOP_RIGHT,
      });
    });

    builder.addCase(createTodo.fulfilled, (state, action) => {
      const newTodo = action.payload;
      state.todos.push(newTodo);
    });

    builder.addCase(createTodo.rejected, () => {
      toast.error('error al momento de crear un nuevo todo', {
        position: toast.POSITION.TOP_RIGHT,
      });
    });
  },
});

export default todosSlice.reducer;
