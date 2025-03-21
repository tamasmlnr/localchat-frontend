import { SERVER_URL } from "@/constants/constants";
import api from "@/utils/axios/axiosInstance";


export const loginUser = async (credentials: UserLoginInput): Promise<UserLoginResponse> => {
    try {
        // Force an error by sending to an invalid endpoint
        const { data } = await api.post<UserLoginResponse>(`${SERVER_URL}/api/INVALID_ENDPOINT`, credentials);
        return data;
    } catch (error) {
        console.error("LOGIN REQUEST FAILED:", error);
        throw error;
    }

};

export const registerUser = async (userData: UserLoginInput) => {
    const { data } = await api.post(`${SERVER_URL}/api/users`, userData);
    return data;
};

export const getAllUsers = async (): Promise<User[]> => {
    const { data } = await api.get<User[]>(`${SERVER_URL}/api/users`);
    return data;
};

export const getUserDetails = async (userName: string): Promise<User> => {
    const { data } = await api.get<User>(`${SERVER_URL}/api/users/${userName}`);
    return data;
};

export const uploadPhoto = async (formData: FormData) => {
    const { data } = await api.post(`${SERVER_URL}/api/users/upload-photo`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
};
