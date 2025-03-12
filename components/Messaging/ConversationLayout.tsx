// MessagingLayout.tsx
import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import AnimatedMessage from './AnimatedMessage';
import { useGetConversationQuery } from '../../hooks/queries/useGetMessages';
import { useSendMessageMutation } from '../../hooks/queries/useSendMessageMutation';
import { useSocket } from '../../hooks/useSocket';
import { ThemedText } from '../ThemedText';
import { theme } from '@/theme/theme';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/selectors/authSelectors';

interface MessagingLayoutProps {
    recipientUsername?: string | undefined;
    conversationId?: string | undefined;
}

const MessagingLayout = ({ recipientUsername, conversationId }: MessagingLayoutProps) => {
    const [message, setMessage] = useState('');
    const { data: messages, isLoading, isError } = useGetConversationQuery(conversationId ?? '');
    const { mutate: sendMessageMutation } = useSendMessageMutation();
    const { messages: socketMessages, sendMessage: sendMessageSocket } = useSocket(recipientUsername ?? '');
    const combinedMessages = [...(messages || []), ...socketMessages];
    const currentUser = useSelector(selectUser);
    console.log(messages);

    const handleSend = () => {
        if (message.trim() && recipientUsername) {
            const newMessage = {
                senderId: currentUser,
                receiverId: recipientUsername,
                content: message,
                conversationId: conversationId
            };

            sendMessageSocket(recipientUsername, conversationId!, message);
            sendMessageMutation(newMessage);

            setMessage('');
        }
    };

    const renderItem = ({ item, index }) => (
        <AnimatedMessage item={item} index={index} messagesLength={combinedMessages.length} />
    );

    if (isLoading) return <View><ThemedText>Loading...</ThemedText></View>;
    if (isError) return <View><ThemedText>Error loading messages</ThemedText></View>;

    return (
        <View style={styles.container}>
            <FlatList
                data={combinedMessages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.messagesContainer}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    mode="outlined"
                    placeholder="Type a message"
                    value={message}
                    onChangeText={setMessage}
                    style={styles.input}
                />
                <IconButton icon="send" size={24} onPress={handleSend} iconColor={message.length > 0 ? theme.colors.primary : undefined} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    messagesContainer: {
        flexGrow: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    input: {
        flex: 1,
        marginRight: 8,
    },
});

export default MessagingLayout;
