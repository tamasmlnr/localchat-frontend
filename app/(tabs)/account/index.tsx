import ThemedButton from '@/components/ThemedButton';
import UploadScreen from '@/components/UploadScreen';
import { logout } from '@/store/authSlice';
import { useAppDispatch } from '@/store/hooks';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const Account = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleClick = () => {
        dispatch(logout());
        router.replace("/auth")
    }
    return (
        <View>
            <UploadScreen />
            <ThemedButton
                onPress={handleClick}
            >
                Log out
            </ThemedButton >
        </View>
    );
};

export default Account;