import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../api/client';

const initialState = {
  challenges: [],
  currentChallenge: null,
  loading: false,
  error: null,
};

export const fetchChallenges = createAsyncThunk(
  'challenges/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await client.get('/challenges');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const challengeSlice = createSlice({
  name: 'challenges',
  initialState,
  reducers: {
    setCurrentChallenge: (state, action) => {
      state.currentChallenge = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChallenges.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChallenges.fulfilled, (state, action) => {
        state.loading = false;
        state.challenges = action.payload;
      })
      .addCase(fetchChallenges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentChallenge } = challengeSlice.actions;
export default challengeSlice.reducer;
