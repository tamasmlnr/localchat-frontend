import { SERVER_URL } from "@/constants/constants";
import axios from "axios";

export const loginUser = async (credentials: UserLoginInput): Promise<UserLoginResponse> => {
    const { data } = await axios.post<UserLoginResponse>(`${SERVER_URL}/api/login`, credentials);
    return data;
};
