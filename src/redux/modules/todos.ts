import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { newCard } from '../../types/listType';

const initialState: newCard[] = [];

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<newCard>) => {
      state.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state = state.filter((item) => item.id !== action.payload);
    },
    switchTodo: (state, action: PayloadAction<string>) => {
      state = state.map((item) => {
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
