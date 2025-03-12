import { useQuery } from 'react-query';
import { getOrCreateConversations } from '@/services/messageService';

export const useGetOrCreateConversations = (user1Id: string | null | undefined, user2Id: string | undefined | null) => {
    return useQuery(
        ['conversations', user1Id, user2Id],
        () => getOrCreateConversations(user1Id, user2Id),
        { enabled: (!!user1Id || !!user2Id) }
    );
};
