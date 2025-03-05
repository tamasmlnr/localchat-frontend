import ThemedButton from '@/components/ThemedButton';
import { logout } from '@/store/authSlice';
import { useAppDispatch } from '@/store/hooks';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import { Button } from 'react-native-paper';

const Account = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleClick = () => {
        dispatch(logout());
        router.replace("/auth")
    }
    return (
        <ThemedButton
            onPress={handleClick}
        >
            Log out
        </ThemedButton >
    );
};

export default Account;