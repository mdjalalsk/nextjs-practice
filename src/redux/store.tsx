// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/redux/features/authSlice'; // Adjust path as per your project structure

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
