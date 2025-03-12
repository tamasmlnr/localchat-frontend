import { useQuery } from 'react-query';
import { getConversation } from '@/services/messageService';

export const useGetOrCreateConversationQuery = (conversationId: string) => {
    return useQuery(
        ['getOrCreateConversation', conversationId],
        () => getConversation(conversationId),
        { enabled: !!conversationId }
    );
};
