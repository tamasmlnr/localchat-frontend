import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
    user: string | null;
    token: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
};

const saveAuthToStorage = async (user: string, token: string) => {
    await AsyncStorage.setItem("user", user);
    await AsyncStorage.setItem("token", token);
};

const clearAuthFromStorage = async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ user: string; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            saveAuthToStorage(action.payload.user, action.payload.token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            clearAuthFromStorage();
        },
        setAuth: (state, action: PayloadAction<AuthState>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
    },
});

export const { login, logout, setAuth } = authSlice.actions;
export default authSlice.reducer;
