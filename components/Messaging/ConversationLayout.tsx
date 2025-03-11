import React, { useState, useRef } from 'react';
import { View, StyleSheet, FlatList, Animated } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import AnimatedMessage from './AnimatedMessage';

interface MessagingLayoutProps {
    userId?: string
    conversationId?: string | null
}

const MessagingLayout = ({ userId, conversationId }: MessagingLayoutProps) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        {
            id: '1',
            authorName: "John Doe",
            authorIconUri: "https://randomuser.me/api/portraits/men/1.jpg",
            authorId: "1",
            messageContent: "Hey, how are you?",
            isSent: false,
        },
        {
            id: '2',
            authorName: "Me",
            authorIconUri: "https://randomuser.me/api/portraits/men/2.jpg",
            authorId: "2",
            messageContent: "I'm good, thanks!",
            isSent: true,
        }
    ]);

    const flatListRef = useRef(null);

    const handleSend = () => {
        if (message.trim()) {

            const newMessage = {
                id: Date.now().toString(),
                authorName: "Me",
                authorIconUri: "https://randomuser.me/api/portraits/men/2.jpg",
                authorId: "2",
                messageContent: message,
                isSent: true,
            };

            setMessages([...messages, newMessage]);
            console.log('Send Message:', message);
            setMessage('');

            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    };

    const renderItem = ({ item, index }) => (
        <AnimatedMessage
            item={item}
            index={index}
            messagesLength={messages.length}
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderItem}
                keyExtractor={item => item.id}
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
                <IconButton
                    icon="send"
                    size={24}
                    onPress={handleSend}
                />
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