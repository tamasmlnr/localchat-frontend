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
                name="[conversationId]"
                options={{
                    headerTitle: "Conversation",
                    headerBackTitle: "Messages"
                }}
            />
            <Stack.Screen
                name="new/[recipientUsername]"
                options={{
                    headerTitle: "Conversation",
                    headerBackTitle: "Messages"
                }}
            />
        </Stack>
    );
}