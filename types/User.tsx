interface UserLoginInput {
    username: string;
    password: string;
}

interface UserLoginResponse {
    username: string;
    token: string;
}

type User = {
    username: string;
    name: string;
    _id: string
    profilePhotoUrl: string;
    location: {
        latitude: number,
        longitude: number
    },
};
