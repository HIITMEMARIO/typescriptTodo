import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { newCard } from '../../types/listType';

const initialState: newCard[] = [
  {
    id: uuidv4(),
    title: '예시1',
    contents: 'asdfasdfasdfasdf',
    isDone: false,
  },
];

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      return [...state, action.payload];
    },
    deleteTodo: (state, action) => {
      return action.payload;
    },
    switchTodo: (state, action) => {
      return state.map((item) => {
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
