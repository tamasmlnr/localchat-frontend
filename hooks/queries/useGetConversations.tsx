import { useQuery } from 'react-query';
import { getConversations } from '@/services/messageService';

export const useGetConversations = (username: string | null) => {
    return useQuery(
        ['conversations', username],
        () => getConversations(username as string),
        {
            enabled: !!username,
            cacheTime: 0,
            staleTime: 0,
            refetchOnMount: true,
            refetchOnWindowFocus: true,
            refetchInterval: false,
            select: (data) => data ?? [],
        }
    );
};
