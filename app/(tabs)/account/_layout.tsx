import { Stack, useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function AccountLayout() {
    const router = useRouter();

    useFocusEffect(
        useCallback(() => {
            router.replace("/(tabs)/account");
        }, [])
    );

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
        </Stack>
    );
}
