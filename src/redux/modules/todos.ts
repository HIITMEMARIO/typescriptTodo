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
    addData: (state, action) => {
      return action.payload;
    },

    deleteTodo: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.id !== action.payload);
    },
    switchTodo: (state, action: PayloadAction<newCard>) => {
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, isDone: !item.isDone };
        } else {
          return item;
        }
      });
    },
  },
});

export default todosSlice.reducer;
export const { addTodo, deleteTodo, switchTodo, addData } = todosSlice.actions;
