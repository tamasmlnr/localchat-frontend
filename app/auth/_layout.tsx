import { Stack, useRouter, useRootNavigationState } from "expo-router";

export default function AccountLayout() {
    const router = useRouter();
    const navigationState = useRootNavigationState();

    return (
        <Stack screenOptions={{ headerShown: true, gestureEnabled: true }}>
            <Stack.Screen name="index" options={{
                title: "Account",
            }} />
            <Stack.Screen name="login" options={{
                title: "Login",
            }} />
            <Stack.Screen name="register" options={{
                title: "Account registration",
            }} />
        </Stack>
    );
}
