import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';

interface MessageProps {
    authorName: string;
    authorIconUri: string;
    authorId: string;
    messageContent: string;
    isSent: boolean;
}

const Message: React.FC<MessageProps> = ({
    authorName,
    authorIconUri,
    messageContent,
    isSent
}) => {
    return (
        <View
            style={[
                styles.messageContainer,
                isSent ? styles.sentMessageContainer : styles.receivedMessageContainer,
            ]}
        >
            {!isSent && (
                <Text style={styles.authorName}>{authorName}</Text>
            )}

            {!isSent && (
                <Avatar.Image
                    size={40}
                    source={{ uri: authorIconUri }}
                    style={styles.avatar}
                />
            )}
            <View
                style={[
                    styles.messageBubble,
                    isSent ? styles.sentMessageBubble : styles.receivedMessageBubble,
                ]}
            >
                <Text style={styles.messageText}>{messageContent}</Text>
            </View>
            {isSent && (
                <Avatar.Image
                    size={40}
                    source={{ uri: authorIconUri }}
                    style={styles.avatar}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    messageContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'flex-start',
    },
    sentMessageContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    receivedMessageContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    authorName: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
        marginLeft: 50,
    },
    avatar: {
        margin: 5,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 10,
        borderRadius: 15,
        marginVertical: 5,
    },
    sentMessageBubble: {
        backgroundColor: '#DCF8C6',
        borderBottomRightRadius: 0,
        alignSelf: 'flex-end',
    },
    receivedMessageBubble: {
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 0,
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
    },
});

export default Message;
