import { Stack } from 'expo-router';

export default function MessagesLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerTitle: "Messages",
                }}
            />
            <Stack.Screen
                name="[messageId]"
                options={{
                    headerTitle: "Conversation",
                    headerBackTitle: "Messages"
                }}
            />
        </Stack>
    );
}