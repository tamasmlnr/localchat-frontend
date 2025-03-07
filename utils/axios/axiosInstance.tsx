import axios from "axios";
import { SERVER_URL } from "@/constants/constants";
import { store } from "@/store";

const api = axios.create({
    baseURL: SERVER_URL
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

export default api;
