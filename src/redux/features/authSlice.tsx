import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    accessToken: string | null;
    isAuthenticated: boolean;
    user: any | null;
    error: string | null;
    loading: boolean;
}

const initialState: AuthState = {
    accessToken: null,
    isAuthenticated: false,
    user: null,
    error: null,
    loading: false,

};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTokens(state, action: PayloadAction<{ accessToken: string }>) {
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
            state.loading = false;
        },
        setUser(state, action: PayloadAction<any>) {
            state.user = action.payload;
            state.loading = false;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.loading = false;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        logout(state) {
            state.accessToken = null;
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            state.loading = false;
        },
    },
});

export const { setTokens, setUser, setError,setLoading, logout } = authSlice.actions;

export default authSlice.reducer;
