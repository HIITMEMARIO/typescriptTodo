import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { newCard } from '../../types/testType';
import axios from 'axios';

interface InitialState {
  todos: newCard[];
  isLoading: boolean;
  isError: boolean;
  error: null;
}

const initialState: InitialState = {
  todos: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const __getTodo = createAsyncThunk(
  'getTodo',
  async (payload, thunkAPI) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todos`);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue('Error fetching todo list');
    }
  }
);

export const __addTodo = createAsyncThunk(
  'addTodo',
  async (payload: newCard, thunkAPI) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/todos`,
        payload
      );
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteTodo = createAsyncThunk(
  'deleteTodo',
  async (payload: string, thunkAPI) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/todos/${payload}`
      );
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __switchTodo = createAsyncThunk(
  'switchTodo',
  async (payload: newCard, thunkAPI) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/todos/${payload.id}`,
        {
          isDone: !payload.isDone,
        }
      );
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__getTodo.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__getTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.todos = action.payload;
      })
      .addCase(__getTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
    builder
      .addCase(__addTodo.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__addTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.todos.push(action.payload);
      })
      .addCase(__addTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
    builder
      .addCase(__deleteTodo.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__deleteTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.todos = state.todos.filter((item) => {
          return item.id !== action.payload;
        });
      })
      .addCase(__deleteTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
    builder
      .addCase(__switchTodo.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__switchTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.todos = state.todos.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, isDone: !item.isDone };
          } else {
            return item;
          }
        });
      })
      .addCase(__switchTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default todosSlice.reducer;
