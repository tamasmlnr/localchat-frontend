import React, { useEffect } from 'react';
import MessagePreview from './MessagePreview';
import { ScrollView } from 'react-native';
import { selectUser } from '@/store/selectors/authSelectors';
import { useSelector } from 'react-redux';
import { useGetConversations } from '@/hooks/queries/useGetConversations';
import { useIsFocused } from '@react-navigation/native';

const MessageOverview = () => {
    const currentUser = useSelector(selectUser);
    const { data: conversations = [], refetch } = useGetConversations(currentUser);
    const isFocused = useIsFocused();

    useEffect(() => {
        refetch()
    }, [isFocused])

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