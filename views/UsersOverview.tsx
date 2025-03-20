import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Animated, Dimensions } from 'react-native';
import { Switch, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useGetAllUsers } from '@/hooks/queries/useGetAllUsers';
import { selectUser } from '@/store/selectors/authSelectors';
import UserCard from '@/components/UserCard';
import { theme } from '@/theme/theme';
import { ThemedText } from '@/components/ThemedText';

const { width } = Dimensions.get('window');

const UsersOverview = () => {
    const [isOnline, setIsOnline] = useState(false);
    const { data: users = [], refetch } = useGetAllUsers(isOnline);
    const currentUser = useSelector(selectUser);
    const filteredUsers = users.filter((user) => {
        return user.username !== currentUser;
    });
    const [animation] = useState(new Animated.Value(0));

    const toggleOnlineStatus = () => {
        const newValue = !isOnline;
        setIsOnline(newValue);

        Animated.timing(animation, {
            toValue: newValue ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const switchContainerTop = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [(width / 2) - 50, 20]
    });

    const switchScale = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1.5, 1]
    });

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.switchContainer,
                    {
                        top: switchContainerTop,
                        transform: [{ scale: switchScale }]
                    }
                ]}
            >
                {!isOnline && (
                    <View style={styles.textContainer}>
                        <ThemedText style={styles.switchLabel}>Go online</ThemedText>
                        <ThemedText type="body" style={{ textAlign: 'center', flexWrap: 'wrap' }}>
                            You will only be seen by other people around you if you are online.
                        </ThemedText>

                    </View>
                )}

                <View style={styles.switchRow}>
                    <Switch
                        value={isOnline}
                        onValueChange={toggleOnlineStatus}
                        color={theme.colors.primary}

                    />

                    {isOnline && (
                        <ThemedText style={styles.inlineLabel}>Go offline</ThemedText>
                    )}
                </View>
            </Animated.View>

            {isOnline && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={filteredUsers}
                        keyExtractor={(item) => item.username}
                        renderItem={({ item }) => <UserCard user={item} />}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    switchContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    switchLabel: {
        marginBottom: 8,
        fontSize: 16,
        fontWeight: '600',
        alignSelf: "center"
    },
    inlineLabel: {
        marginLeft: 10,
        fontSize: 14,
        fontWeight: '500',
    },
    listContainer: {
        marginTop: 20,
        flex: 1,
    },
    textContainer: {
        maxWidth: width * 0.5
    }
});

export default UsersOverview;