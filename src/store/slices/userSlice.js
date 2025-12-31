import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../api/client';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await client.post('/auth/login', credentials);
      localStorage.setItem('token', response.data.token);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await client.post('/auth/register', userData);
      localStorage.setItem('token', response.data.token);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchMe',
  async (_, { rejectWithValue }) => {
    try {
      const response = await client.get('/auth/me');
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Me
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem('token');
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
