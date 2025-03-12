import React from 'react';
import { useRoute } from '@react-navigation/native';
import MessagingLayout from '@/components/Messaging/ConversationLayout';

const NewMessage = () => {
    const route = useRoute();
    const { recipientUsername } = route.params as { recipientUsername: string };
    console.log("new message - recipient", recipientUsername);

    return (
        <MessagingLayout recipientUsername={recipientUsername} />
    );
};

export default NewMessage;
