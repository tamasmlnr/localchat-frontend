import { theme } from '@/theme/theme';
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
                <Avatar.Image
                    size={40}
                    source={{ uri: authorIconUri }}
                    style={styles.avatar}
                />
            )}

            <View style={styles.messageContentContainer}>
                {!isSent && <Text style={styles.authorName}>{authorName}</Text>}

                <View
                    style={[
                        styles.messageBubble,
                        isSent ? styles.sentMessageBubble : styles.receivedMessageBubble,
                    ]}
                >
                    <Text style={[styles.messageText, { color: isSent ? theme.colors.secondary : theme.colors.tertiary }]}>{messageContent}</Text>
                </View>
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
        alignItems: 'flex-end', 
    },
    sentMessageContainer: {
        justifyContent: 'flex-end',
    },
    receivedMessageContainer: {
        justifyContent: 'flex-start',
    },
    messageContentContainer: {
        maxWidth: '80%',
    },
    authorName: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 3,
        marginLeft: 10, 
    },
    avatar: {
        marginHorizontal: 5,
    },
    messageBubble: {
        padding: 10,
        borderRadius: 15,
        marginVertical: 2,
    },
    sentMessageBubble: {
        backgroundColor: theme.colors.primary,
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
