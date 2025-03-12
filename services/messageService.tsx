import { SERVER_URL } from "@/constants/constants";
import api from "@/utils/axios/axiosInstance";

export const sendMessage = async (messageData: {
    senderId: string;
    receiverId: string;
    content: string;
}) => {
    const { data } = await api.post(`${SERVER_URL}/api/messages`, messageData);
    return data;
};

export const getConversation = async (conversationId: string) => {
    const { data } = await api.get(`${SERVER_URL}/api/messages/conversation/${conversationId}`);
    return data;
};

export const getConversations = async (userId: string) => {
    const { data } = await api.get(`${SERVER_URL}/api/messages/conversations/${userId}`);
    return data;
};
export const getOrCreateConversations = async (user1Id: string | undefined | null, user2Id: string | undefined | null) => {
    const { data } = await api.post(`${SERVER_URL}/api/messages/conversation/users`, { user1Id, user2Id });
    return data;
};