import { useGetAllUsers } from '@/hooks/queries/useGetAllUsers';
import React from 'react';
import UserCard from '../../../components/UserCard';
import { View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/selectors/authSelectors';

const Users = () => {
    const { data: users = [], refetch } = useGetAllUsers();
    const currentUser = useSelector(selectUser);
    const filteredUsers = users.filter((user) => {
        return user.username !== currentUser
    })
    return (
        <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.username}
            renderItem={({ item }) => <UserCard user={item} />}
        />
    );
};

export default Users;
