import { SERVER_URL } from '@/constants/constants';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
}

const server = "http://10.0.2.2:3002"
const socket = io(server);

export const useSocket = (userId: string, conversationId: string) => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        console.log("used");
        socket.emit('join', userId);
        socket.on('receive-message', (message: Message) => {
            console.log("received");
            console.log(message);
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    _id: Date.now().toString(),
                    createdAt: Date.now().toString(),
                    ...message,
                    receiverId: userId,
                    conversationId
                },
            ]);
        });

        socket.on('connect', () => {
            console.log("Socket connected! ID:", socket.id);
        });

        socket.on('connect_error', (error) => {
            console.error("Socket connection error:", error);
        });


        return () => {
            socket.off('receive-message');
        };

    }, [userId]);

    const sendMessage = (senderId: string, receiverId: string, content: string) => {
        console.log(`sent from ${senderId} to ${receiverId} : ${content}`);
        socket.emit('send-message', { senderId, receiverId, content });
    };

    return { messages, sendMessage };
};
