// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/redux/features/authSlice'; // Adjust path as per your project structure

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;
