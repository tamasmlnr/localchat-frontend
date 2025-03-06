import { useNavigation, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Avatar } from 'react-native-paper';

interface MessagePreviewProps {
    userIcon: string;
    userName: string;
    message: string;
    conversationId: string
}

const MessagePreview: React.FC<MessagePreviewProps> = ({ userIcon, userName, message, conversationId }) => {
    const router = useRouter();

    const handleMessageTouch = () => {
        router.push(`/(tabs)/messages/${conversationId}`);
    };


    return (
        <Pressable style={styles.container} onPress={handleMessageTouch}>
            <Avatar.Image source={{ uri: userIcon }} size={40} style={styles.userIcon} />
            <View style={styles.messageInfo}>
                <Text style={styles.userName}>{userName}</Text>
                <Text style={styles.messageText} numberOfLines={2}>
                    {message}
                </Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    userIcon: {
        marginRight: 10,
    },
    messageInfo: {
        flexDirection: 'column',
        flex: 1,
    },
    userName: {
        fontWeight: 'bold',
    },
    messageText: {
        color: '#555',
        fontSize: 14,
    },
});

export default MessagePreview;
