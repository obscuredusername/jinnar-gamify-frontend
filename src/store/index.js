import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import challengeReducer from './slices/challengeSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    challenges: challengeReducer,
  },
  devTools: import.meta.env.DEV,
});

export default store;
