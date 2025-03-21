import { selectUser } from "@/store/selectors/authSelectors";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

interface Message {
    _id: string;
    sender: string;
    receiver: string;
    content: string;
    conversationId?: string;
    createdAt: string;
}

interface SocketContextType {
    messages: Message[];
    sendMessage: (senderId: string, receiverId: string, content: string, conversationId: string) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

const SOCKET_SERVER_URL = "http://10.0.2.2:3002";

interface SocketProviderProps {
    children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const userId = useSelector(selectUser);
    const [messages, setMessages] = useState<Message[]>([]);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (userId) {
            const newSocket = io(SOCKET_SERVER_URL);
            newSocket.emit("join", userId);
            setSocket(newSocket);

            newSocket.on("receive-message", (message: Message) => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { ...message, _id: Date.now().toString(), createdAt: new Date().toISOString() },
                ]);
            });

            return () => {
                newSocket.disconnect();
            };
        }
    }, [userId]);

    const sendMessage = (sender: string, receiver: string, content: string, conversationId: string) => {
        if (socket) {
            socket.emit("send-message", { sender, receiver, content, conversationId });
            setMessages((prevMessages) => [
                ...prevMessages,
                { content, sender, receiver, _id: Date.now().toString(), createdAt: new Date().toISOString() },
            ]);

        }
    };

    return (
        <SocketContext.Provider value={{ messages, sendMessage }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};
