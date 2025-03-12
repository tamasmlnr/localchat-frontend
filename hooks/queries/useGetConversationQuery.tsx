import { useQuery } from 'react-query';
import { getConversation } from '@/services/messageService';

export const useGetConversationQuery = (conversationId: string) => {
    return useQuery(
        ['messages', conversationId],
        () => getConversation(conversationId),
        { enabled: !!conversationId }
    );
};
