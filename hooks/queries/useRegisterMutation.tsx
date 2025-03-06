import { registerUser } from "@/services/userService";
import { useRouter } from "expo-router";
import { useMutation } from "react-query";

export const useRegisterUser = () => {
    const router = useRouter();

    return useMutation(registerUser, {
        onSuccess: (data) => {
            console.log("User registered successfully", data);
            router.replace("/auth/login");
        },
        onError: (error: any) => {
            console.error("Error registering user:", error);
        },
    });
};
