import React from 'react';
import { useRoute } from '@react-navigation/native';
import MessagingLayout from '@/components/Messaging/ConversationLayout';

const NewMessage = () => {
    const route = useRoute();
    const { userId } = route.params as { userId: string };

    return (
        <MessagingLayout userId={userId} />
    );
};

export default NewMessage;
