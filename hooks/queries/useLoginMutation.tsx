import { loginUser } from "@/services/userService";
import { useMutation } from "react-query";


export const useLoginMutation = () => {
    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            console.log("Login successful:", data);
            // Store token in AsyncStorage / SecureStore if needed
            // AsyncStorage.setItem("token", data.token);
        },
        onError: (error) => {
            console.error("Login failed:", error);
        },
    });
};