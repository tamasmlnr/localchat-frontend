import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../store/hooks";
import { setAuth } from "../store/authSlice";

const useLoadAuthState = () => {
    const dispatch = useAppDispatch();
    const [user, setUser] = useState<{ username: string } | null>(null);

    useEffect(() => {
        const loadAuth = async () => {
            const storedUser = await AsyncStorage.getItem("user");
            const token = await AsyncStorage.getItem("token");

            if (storedUser && token) {
                dispatch(setAuth({ user: storedUser, token }));
                setUser({ username: storedUser });
            }
        };

        loadAuth();
    }, [dispatch]);

    return user;
};

export default useLoadAuthState;
