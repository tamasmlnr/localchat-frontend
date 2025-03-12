import MessageOverview from '@/components/Messaging/MessageOverview';
import { useIsFocused } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { View } from 'react-native';

const Messages = () => {
    const { username } = useLocalSearchParams();
    const router = useRouter();

    useEffect(() => {
        if (username) {
            router.replace(`/(tabs)/messages/new/${username}`);
        }
    }, [username]);

    return (
        <MessageOverview />
    );
};

export default Messages;