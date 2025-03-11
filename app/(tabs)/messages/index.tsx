import MessageOverview from '@/components/Messaging/MessageOverview';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { View } from 'react-native';

const Messages = () => {
    const { username } = useLocalSearchParams();
    const router = useRouter();

    useEffect(() => {
        if (username) {
            router.push(`/(tabs)/messages/new/${username}`);
        }
    }, [username]);

    return (
        <MessageOverview />
    );
};

export default Messages;