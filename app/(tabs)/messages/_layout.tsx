import { Stack, useRouter, usePathname, useSegments } from 'expo-router';
import { useRef, useEffect } from 'react';

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
                name="new/[userId]"
                options={{
                    headerTitle: "Conversation",
                    headerBackTitle: "Messages"
                }}
            />
        </Stack>
    );
}