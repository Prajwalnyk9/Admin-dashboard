import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    const cacheKey = 'todos_cache';
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        return JSON.parse(cached); // Use cached todos if possible
      } catch {}
    }
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await res.json();
      localStorage.setItem(cacheKey, JSON.stringify(data)); // Save to cache
      return data;
    } catch {
      return rejectWithValue('Failed to load todos');
    }
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [], // All todos
    loading: false, // Loading state
    error: '', // Error message
    filter: 'all', // Filter: all, completed, or pending
  },
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load todos';
      });
  },
});

export const { setFilter } = todosSlice.actions;
export default todosSlice.reducer;
