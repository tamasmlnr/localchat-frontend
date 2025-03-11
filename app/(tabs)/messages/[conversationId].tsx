import React from 'react';
import { useRoute } from '@react-navigation/native';
import MessagingLayout from '@/components/Messaging/ConversationLayout';

const MessageDetail = () => {
    const route = useRoute();
    const { conversationId } = route.params as { conversationId: string };


    return (
        <MessagingLayout conversationId={conversationId} />
    );
};

export default MessageDetail;
