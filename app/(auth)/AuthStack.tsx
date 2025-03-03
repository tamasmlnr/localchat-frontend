import { Stack } from "expo-router";

export default function AccountStack() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Account",
                }}
            />
            <Stack.Screen
                name="login"
                options={{
                    title: "Login",
                }}
            />
            <Stack.Screen
                name="register"
                options={{
                    title: "Register",
                }}
            />
        </Stack>
    );
}