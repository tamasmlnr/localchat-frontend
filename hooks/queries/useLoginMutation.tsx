import { loginUser } from "@/services/userService";
import { login } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "expo-router";
import { useMutation } from "react-query";

export const useLoginMutation = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            dispatch(login({ user: data.username, token: data.token }));
            router.replace("/")
        },
        onError: (error) => {
            console.error("Login failed:", error);
        },
    });
};