import axios from "axios";

export const loginUser = async (credentials: UserLoginInput): Promise<UserLoginResponse> => {
    const { data } = await axios.post<UserLoginResponse>(`${process.env.SERVER_URL}/api/login`, credentials);
    console.log(data);
    return data;
};
