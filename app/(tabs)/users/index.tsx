import { useGetAllUsers } from '@/hooks/queries/useGetAllUsers';
import React from 'react';
import UserCard from '../../../components/UserCard';
import { View } from 'react-native';

const Users = () => {
    const { data: users = [] } = useGetAllUsers();

    return (
        <View>{users.map((user) => <UserCard user={user} key={user.username} />)}</View>
    );
};

export default Users;