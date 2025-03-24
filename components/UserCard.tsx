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
import calculateDistance from '@/utils/axios/distanceUtils';


interface UsercardProps {
    user: User;
}

const UserCard = ({ user }: UsercardProps) => {
    const theme = useTheme();
    const router = useRouter();
    const currentUserId = useSelector(selectUser);
    const { data: currentUserDetails } = useGetUserDetails(currentUserId ?? '');
    console.log(currentUserDetails?.location);

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
                </Card.Content>
                <Card.Content style={styles.cardContent}>
                    {user?.location && <Text>{calculateDistance(currentUserDetails?.location?.latitude, currentUserDetails?.location?.longitude, user?.location?.latitude, user?.location?.longitude)}</Text>}
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
        backgroundColor: theme.colors.secondary,
        border: "0"
    },
    textContainer: {
        marginLeft: 10,
    },
    icon: {
        marginLeft: 'auto',
    },
});

export default UserCard;
