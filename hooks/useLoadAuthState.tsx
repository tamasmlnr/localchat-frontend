import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../store/hooks";
import { setAuth } from "../store/authSlice";

const useLoadAuthState = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const loadAuth = async () => {
            const storedUser = await AsyncStorage.getItem("user");
            const token = await AsyncStorage.getItem("token");

            if (storedUser && token) {
                dispatch(setAuth({ user: storedUser, token }));
            }
        };

        loadAuth();
    }, [dispatch]);

};

export default useLoadAuthState;
