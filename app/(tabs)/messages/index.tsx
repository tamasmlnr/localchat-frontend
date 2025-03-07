import MessageOverview from '@/components/Messaging/MessageOverview';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { View } from 'react-native';

const Messages = () => {
    const { openUserId } = useLocalSearchParams();
    const router = useRouter();

    useEffect(() => {
        if (openUserId) {
            router.push(`/(tabs)/messages/new/${openUserId}`);
        }
    }, [openUserId]);

    return (
        <MessageOverview />
    );
};

export default Messages;