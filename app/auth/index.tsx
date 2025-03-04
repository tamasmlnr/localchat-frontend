import ThemedButton from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { View } from 'react-native';
import { Button, Icon, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';

const Account = () => {
    const theme = useTheme();
    const router = useRouter();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <Icon source="palm-tree" size={150} color={theme.colors.primary} />

            <Button
                icon="login"
                mode="contained"
                onPress={() => router.push('/auth/login')}
                textColor={theme.colors.secondary}
                style={{ width: '50%', marginTop: 20 }}
            >
                <ThemedText color='light' type='default'>Log in</ThemedText>
            </Button>
            <Button
                icon="account-plus-outline"
                mode="contained"
                onPress={() => router.push('/auth/register')}
                textColor={theme.colors.secondary}
                style={{ width: '50%', marginTop: 20 }}
            >
                <ThemedText color='light' type='default'>Register</ThemedText>
            </Button>
        </View>
    );
};

export default Account;
