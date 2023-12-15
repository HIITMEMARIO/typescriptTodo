import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = [
  {
    id: uuidv4(),
    title: 'adsfasdf',
    contents: 'asdfasdfasdfasdf',
    isDone: false,
  },
];

const listSlice = createSlice({
  name: 'list',
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
          item.isDone = !item.isDone;
        }
        return item;
      });
    },
  },
});

export default listSlice.reducer;
export const { addTodo, deleteTodo, switchTodo } = listSlice.actions;
