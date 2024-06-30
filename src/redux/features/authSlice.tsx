import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    user: any | null; // Replace `any` with a specific user type/interface
    error: string | null;
}

const initialState: AuthState = {
    token: null,
    isAuthenticated: false,
    user: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
            state.isAuthenticated = true;
        },
        setUser(state, action: PayloadAction<any>) {
            state.user = action.payload;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
        logout(state) {
            state.token = null;
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
        },
    },
});

export const { setToken, setUser, setError, logout } = authSlice.actions;

export default authSlice.reducer;
