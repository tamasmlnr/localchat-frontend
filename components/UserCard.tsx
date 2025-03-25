import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card, useTheme, IconButton } from 'react-native-paper';
import { ThemedText } from './ThemedText';
import { theme } from '@/theme/theme';
import { useRouter } from 'expo-router';
import ProfilePhotoIcon from './ProfilePhotoIcon';
import { useGetUserDetails } from '@/hooks/queries/useGetUserDetails';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/selectors/authSelectors';
import { formatDistanceInKm } from '@/utils/axios/distanceUtils';

interface UsercardProps {
    user: User;
}

const UserCard = ({ user }: UsercardProps) => {
    const theme = useTheme();
    const router = useRouter();
    const currentUserId = useSelector(selectUser);
    const { data: currentUserDetails } = useGetUserDetails(currentUserId ?? '');

    const handleMessagePress = () => {
        router.push({
            pathname: '/(tabs)/messages',
            params: { username: user.username }
        });
    };

    return (
        <View style={styles.container}>
            <Card>
                <Card.Content style={styles.cardContent}>
                    <View style={styles.topRow}>
                        <ProfilePhotoIcon size={50} source={user.profilePhotoUrl} />
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
                    </View>
                    {user?.location && (
                        <Text style={styles.distanceText}>
                            {formatDistanceInKm(user?.distance)} km away
                        </Text>
                    )}
                </Card.Content>
            </Card>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        backgroundColor: theme.colors.secondary,
        borderRadius: 12,
    },
    cardContent: {
        backgroundColor: theme.colors.secondary,
        paddingVertical: 12,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textContainer: {
        marginLeft: 10,
        flex: 1,
    },
    icon: {
        marginLeft: 'auto',
    },
    distanceText: {
        marginTop: 4,
        color: theme.colors.tertiary,
        alignSelf: 'flex-start',
    },
});


export default UserCard;
