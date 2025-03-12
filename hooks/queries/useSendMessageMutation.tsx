import { useMutation } from 'react-query';
import { sendMessage } from '@/services/messageService';

export const useSendMessageMutation = () => {
    return useMutation(
        async (newMessage: { senderId: string; receiverId: string; content: string }) => {
            const response = await sendMessage(newMessage);
            return response.data;
        }
    );
};
