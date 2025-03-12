import React from 'react';
import MessagingLayout from '@/components/Messaging/ConversationLayout';
import { useLocalSearchParams } from 'expo-router';

const MessageDetail = () => {
    const { conversationId, userName } = useLocalSearchParams<{ conversationId: string; userName: string }>();

    return (
        <MessagingLayout conversationId={conversationId} recipientUsername={userName} />
    );
};

export default MessageDetail;
