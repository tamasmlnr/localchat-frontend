import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Avatar, useTheme, IconButton } from 'react-native-paper';
import { ThemedText } from './ThemedText';
import { theme } from '@/theme/theme';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';

interface User {
    name: string;
    _id: string
}

interface UsercardProps {
    user: User;
}

const UserCard = ({ user }: UsercardProps) => {
    const randomAvatar = Math.floor(Math.random() * 6) + 1;
    const theme = useTheme();
    const router = useRouter();

    const handleMessagePress = () => {
        router.push({
            pathname: '/(tabs)/messages',
            params: { openUserId: user._id }
        });
    };

    return (
        <View style={styles.container}>
            <Card>
                <Card.Content style={styles.cardContent}>
                    <Avatar.Image size={50} source={{ uri: `https://randomuser.me/api/portraits/men/${randomAvatar}.jpg` }} />
                    <View style={styles.textContainer}>
                        <ThemedText color={theme.colors.tertiary}>{user?.name}</ThemedText>
                    </View>
                    <IconButton
                        icon="message"
                        iconColor={theme.colors.primary}
                        size={24}
                        onPress={handleMessagePress}
                        style={styles.icon}
                    />
                </Card.Content>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.secondary
    },
    textContainer: {
        marginLeft: 10,
    },
    icon: {
        marginLeft: 'auto',
    },
});

export default UserCard;
