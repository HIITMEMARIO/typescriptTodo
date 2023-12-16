import todosSlice from '../modules/todos';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    todosSlice: todosSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
