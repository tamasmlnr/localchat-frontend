import { useQuery, UseQueryResult } from 'react-query';
import { getUserDetails } from '@/services/userService';
import { User } from '@/types/User';

export const useGetUserDetails = (userName: string): UseQueryResult<User, Error> => {
    return useQuery(
        ['getUserDetails', userName,],
        () => getUserDetails(userName),
        { enabled: (!!userName) }
    );
};
