import React, { useRef, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import AnimatedMessage from './AnimatedMessage';
import { ThemedText } from '../ThemedText';
import { theme } from '@/theme/theme';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/selectors/authSelectors';
import { useGetOrCreateConversations } from '@/hooks/queries/useGetConversationWithUser';
import { useSocket } from '@/contexts/SocketContext';
import { Message } from '@/types/Message';

interface MessagingLayoutProps {
    recipientUsername?: string | undefined;
}

const MessagingLayout = ({ recipientUsername }: MessagingLayoutProps) => {
    const [message, setMessage] = useState('');
    const currentUser = useSelector(selectUser);
    const { sendMessage, messages: socketMessages } = useSocket();
    const { data: { messages = [], conversation } = {}, isLoading, isError } = useGetOrCreateConversations(currentUser, recipientUsername);
    const combinedMessages: Message[] = [...(messages || []), ...socketMessages];
    const flatListRef = useRef<FlatList>(null);
    const handleSend = () => {
        if (message.trim() && recipientUsername) {
            sendMessage(currentUser!, recipientUsername, message, conversation._id);
            setMessage('');
        }
    };

    const renderItem = ({ item, index }: { item: Message, index: number }) => (
        <AnimatedMessage item={item} index={index} messagesLength={combinedMessages.length} />
    );

    const handleContentSizeChange = (_: number, contentHeight: number) => {
        if (flatListRef.current) {
            const extraScroll = 50;
            flatListRef.current.scrollToOffset({
                offset: contentHeight + extraScroll,
                animated: true,
            });
        }
    };

    if (isLoading) return <View><ThemedText>Loading...</ThemedText></View>;
    if (isError) return <View><ThemedText>Error loading messages</ThemedText></View>;

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={combinedMessages}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.messagesContainer}
                onContentSizeChange={handleContentSizeChange}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    mode="outlined"
                    placeholder="Type a message"
                    value={message}
                    onChangeText={setMessage}
                    style={styles.input}
                    textColor={theme.colors.tertiary}
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
        color: "red"
    },
});

export default MessagingLayout;
