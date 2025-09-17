import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { picsumSeed } from '../utils/img';

export const fetchPhotos = createAsyncThunk(
  'photos/fetchPhotos',
  async (_, { rejectWithValue }) => {
    const cacheKey = 'photos_meta_8';
    // Try cache first
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        return JSON.parse(cached); // Use cached photos if possible
      } catch {}
    }
    // Fetch from API
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=8');
      const data = await res.json();
      // Add safe image URLs for thumbnails and previews
      const withSafeImages = data.map((p) => ({
        ...p,
        safeThumb: picsumSeed(p.id, 300, 200),
        safeUrl: picsumSeed(p.id, 900, 600),
      }));
      localStorage.setItem(cacheKey, JSON.stringify(withSafeImages)); // Save to cache
      return withSafeImages;
    } catch {
      return rejectWithValue('Failed to load photos');
    }
  }
);

const photosSlice = createSlice({
  name: 'photos',
  initialState: {
    items: [], // All photos
    loading: false, // Loading state
    error: '', // Error message
    index: 0, // Current photo index for carousel
  },
  reducers: {
    // Go to the next photo in the carousel
    nextPhoto(state) {
      state.index = (state.index + 1) % state.items.length;
    },
    // Go to the previous photo in the carousel
    prevPhoto(state) {
      state.index = (state.index - 1 + state.items.length) % state.items.length;
    },
    // Set the current photo index
    setPhotoIndex(state, action) {
      state.index = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // When fetching starts, set loading
      .addCase(fetchPhotos.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      // When fetching succeeds, save photos and reset index
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.index = 0;
      })
      // When fetching fails, set error
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load photos';
      });
  },
});

// Export the actions and the reducer for use in the app.
export const { nextPhoto, prevPhoto, setPhotoIndex } = photosSlice.actions;
export default photosSlice.reducer;
