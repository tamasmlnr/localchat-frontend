import { SERVER_URL } from "@/constants/constants";
import api from "@/utils/axios/axiosInstance";


export const loginUser = async (credentials: UserLoginInput): Promise<UserLoginResponse> => {
    const { data } = await api.post<UserLoginResponse>(`${SERVER_URL}/api/login`, credentials);
    return data;

};

export const registerUser = async (userData: UserLoginInput) => {
    const { data } = await api.post(`${SERVER_URL}/api/users`, userData);
    return data;
};

export const getAllUsers = async (): Promise<User[]> => {
    const { data } = await api.get<User[]>(`${SERVER_URL}/api/users`);
    return data;
};