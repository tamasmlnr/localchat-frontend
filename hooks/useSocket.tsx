import { SERVER_URL } from '@/constants/constants';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
}

const socket = io(SERVER_URL);

export const useSocket = (userId: string) => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        socket.on('receive-message', (message: Message) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    id: Date.now().toString(),
                    ...message,
                },
            ]);
        });

        return () => {
            socket.off('receive-message');
        };
    }, [userId]);

    const sendMessage = (senderId: string, receiverId: string, content: string) => {
        socket.emit('send-message', { senderId, receiverId, content });
    };

    return { messages, sendMessage };
};
