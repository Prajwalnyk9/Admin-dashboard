import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    const cacheKey = 'posts_cache';
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {}
    }
    try {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await res.json();
      localStorage.setItem(cacheKey, JSON.stringify(data));
      return data;
    } catch {
      return rejectWithValue('Failed to load posts');
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    loading: false,
    error: '',
    page: 1,
    perPage: 10,
    selectedPost: null,
    comments: [],
    commentsLoading: false,
    commentsError: '',
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    selectPost(state, action) {
      state.selectedPost = action.payload;
    },
    clearSelectedPost(state) {
      state.selectedPost = null;
      state.comments = [];
      state.commentsError = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load posts';
      });
  },
});

export const { setPage, selectPost, clearSelectedPost } = postsSlice.actions;
export default postsSlice.reducer;
