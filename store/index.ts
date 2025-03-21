import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import snackbarReducer, { showSnackbar } from "./snackbarSlice";

const errorMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
    if (action.type.endsWith("rejected")) {
        const errorMessage = action.error?.message || "An error occurred";
        storeAPI.dispatch(showSnackbar(errorMessage));
    }
    return next(action);
};

export const store = configureStore({
    reducer: {
        auth: authReducer,
        snackbar: snackbarReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(errorMiddleware)
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
