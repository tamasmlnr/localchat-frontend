import { useMutation, useQueryClient } from 'react-query';
import { sendMessage } from '@/services/messageService';

export const useSendMessageMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async (newMessage: { senderId: string; receiverId: string; content: string }) => {
            const response = await sendMessage(newMessage);
            return response.data;
        },
        {
            onSuccess: (sentMessage) => {
                const { sender, receiver } = sentMessage;

                const cacheKey = ['conversations', sender, receiver];

                queryClient.setQueryData(cacheKey, (oldData: any) => {
                    if (!oldData) return { conversation: null, messages: [sentMessage] };

                    return {
                        ...oldData,
                        messages: [...oldData.messages, sentMessage],
                    };
                });
            },
        }
    );
};
