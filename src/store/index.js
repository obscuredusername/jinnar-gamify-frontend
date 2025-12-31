import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import challengeReducer from './slices/challengeSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    challenges: challengeReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
