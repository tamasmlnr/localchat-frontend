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

export const getNearbyUsers = async (longitude: number, latitude: number): Promise<User[]> => {
    const { data } = await api.get<User[]>(`${SERVER_URL}/api/users/near-location?longitude=${longitude}&latitude=${latitude}}`);
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

export const updateUser = async (user: User) => {
    console.log("update", user);
    const { data } = await api.put(
        `${SERVER_URL}/api/users/${user.username}`,
        user,
        {
            headers: { 'Content-Type': 'application/json' }
        }
    );
    return data;
};
