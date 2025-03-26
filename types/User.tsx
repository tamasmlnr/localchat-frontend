export interface UserLoginInput {
    username: string;
    password: string;
}

export interface UserLoginResponse {
    username: string;
    token: string;
}

export type User = {
    username: string;
    name: string;
    _id: string
    profilePhotoUrl: string;
    location: {
        coordinates: number[]
    },
    distance?: number
};
