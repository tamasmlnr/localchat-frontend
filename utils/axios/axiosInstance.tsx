import axios from "axios";
import { SERVER_URL } from "@/constants/constants";
import { store } from "@/store";
import { showSnackbar } from "@/store/snackbarSlice";
import { logout } from "@/store/authSlice"; // Import your logout action

const api = axios.create({
    baseURL: SERVER_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const errorMessage = error.response?.data?.error || "An error occurred";

        if (error.response?.status === 401) {
            // store.dispatch(logout());
            store.dispatch(showSnackbar("Session expired. Please log in again."));
        } else {
            store.dispatch(showSnackbar(errorMessage));
        }

        return Promise.reject(error);
    }
);

export default api;