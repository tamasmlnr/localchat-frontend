import { Stack, useRouter, useRootNavigationState } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function AccountLayout() {
    const router = useRouter();
    const navigationState = useRootNavigationState();

    useFocusEffect(
        useCallback(() => {
            if (navigationState?.key) {
                router.replace("/(tabs)/account");
            }
        }, [navigationState?.key])
    );

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
        </Stack>
    );
}
