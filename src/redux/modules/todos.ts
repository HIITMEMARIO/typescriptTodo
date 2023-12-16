import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { newCard } from '../../types/listType';

interface todosState {
  todos: newCard[];
}

const initialState: todosState = {
  todos: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<newCard>) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    switchTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.map((item) => {
        if (item.id === action.payload) {
          return { ...item, isDone: !item.isDone };
        } else {
          return item;
        }
      });
    },
  },
});

export default todosSlice.reducer;
export const { addTodo, deleteTodo, switchTodo } = todosSlice.actions;
