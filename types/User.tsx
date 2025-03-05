interface UserLoginInput {
    email: string;
    password: string;
}

interface UserLoginResponse {
    email: string;
    token: string;
}