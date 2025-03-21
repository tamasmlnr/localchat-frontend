import axios from "axios";
import { SERVER_URL } from "@/constants/constants";
import { store } from "@/store";
import { showSnackbar } from "@/store/snackbarSlice";

const api = axios.create({
    baseURL: SERVER_URL
});


api.interceptors.response.use(
    (response) => response,
    (error) => {

        const errorMessage = error.response?.data?.message || "An error occurred";

        store.dispatch(showSnackbar(errorMessage));

        return Promise.reject(error);
    }
);

export default api;
