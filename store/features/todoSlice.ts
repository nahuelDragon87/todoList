import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ITodo } from '../../interfaces';

// Interfaz para el estado de las citas
interface TodoState {
  todos: ITodo[];
  quote: string | null; // Cita obtenida de la API
  showModal: boolean; // Estado del modal
}

const initialState: TodoState = {
  todos: [],
  quote: null,
  showModal: false,
};

// Acción asíncrona para obtener la cita de la API
export const fetchQuote = createAsyncThunk('todos/fetchQuote', async () => {
  const response = await fetch('http://api.quotable.io/random');
  const data = await response.json();
  return data;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, { payload }: PayloadAction<Omit<ITodo, 'id'>>) => {
      const newTodo: ITodo = {
        id: Date.now().toString(),
        text: payload.text,
        description: payload.description,
        dueDate: payload.dueDate,
        isCompleted: false,
      };
      state.todos.push(newTodo);
    },
    removeTodo: (state, { payload }: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== payload);
    },
    toggleTodo: (state, { payload }: PayloadAction<string>) => {
      const index = state.todos.findIndex((todo) => todo.id === payload);
      state.todos[index].isCompleted = !state.todos[index].isCompleted;

      if (state.todos[index].isCompleted) {
        state.showModal = true; // Mostrar el modal cuando se complete la tarea
      }
    },
    closeModal: (state) => {
      state.showModal = false;
      state.quote = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuote.fulfilled, (state, { payload }) => {
      state.quote = payload;
    });
  },
});

export const { addTodo, removeTodo, toggleTodo, closeModal } = todoSlice.actions;

export default todoSlice.reducer;

