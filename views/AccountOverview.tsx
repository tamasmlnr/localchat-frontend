import ThemedButton from '@/components/ThemedButton';
import PhotoUpload from '@/components/PhotoUpload';
import { logout } from '@/store/authSlice';
import { useAppDispatch } from '@/store/hooks';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useGetUserDetails } from '@/hooks/queries/useGetUserDetails';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/selectors/authSelectors';
import { theme } from '@/theme/theme';

const AccountOverview = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const userId = useSelector(selectUser);
    const { data: currentUser, refetch, isFetching } = useGetUserDetails(userId ?? '');

    const handleClick = () => {
        dispatch(logout());
        router.replace("/auth")
    }

    return (
        <View style={styles.container}>
            <ThemedText style={styles.centeredText} type="title">{`Hello, ${currentUser?.name}`}</ThemedText>
            <PhotoUpload />
            <ThemedButton onPress={handleClick}>
                Log out
            </ThemedButton>

        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
    },
    centeredText: {
        alignSelf: "center",
    },
});

export default AccountOverview;