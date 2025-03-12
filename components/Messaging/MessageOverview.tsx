import React from 'react';
import MessagePreview from './MessagePreview';
import { ScrollView, View } from 'react-native';
import { selectUser } from '@/store/selectors/authSelectors';
import { useSelector } from 'react-redux';
import { useGetConversations } from '@/hooks/queries/useGetConversations';
import { date } from 'yup';

const MessageOverview = () => {
    const currentUser = useSelector(selectUser);
    const { data: conversations = [], refetch } = useGetConversations(currentUser);

    return (
        <ScrollView>
            {conversations.map((conversation) =>
                <MessagePreview
                    key={conversation?._id}
                    message={conversation?.lastMessage?.content}
                    conversationId={conversation?._id}
                    userIcon='https://randomuser.me/api/portraits/men/3.jpg'
                    userName={conversation?.userDetails?.[0]?._id} />)}
        </ScrollView>
    );
};

export default MessageOverview;