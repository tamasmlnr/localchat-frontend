import React from 'react';
import MessagePreview from './MessagePreview';
import { ScrollView, View } from 'react-native';
import { selectUser } from '@/store/selectors/authSelectors';
import { useSelector } from 'react-redux';
import { useGetConversations } from '@/hooks/queries/useGetConversations';
import { date } from 'yup';

// const sampleMessages = [{
//     "_id": "conversationId1",
//     "users": [
//         "userA_id",
//         "userB_id"
//     ],
//     "lastMessage": {
//         "_id": "messageId1",
//         "sender": "userA_id",
//         "content": "Hey, how's it going?Hey, how's it going?Hey, how's it going?",
//         "createdAt": "2025-03-06T00:00:00Z"
//     },
//     "createdAt": "2025-03-06T00:00:00Z",
//     "updatedAt": "2025-03-06T00:00:00Z"
// }, {
//     "_id": "conversationId2",
//     "users": [
//         "userA_id",
//         "userB_id"
//     ],
//     "lastMessage": {
//         "_id": "messageId1",
//         "sender": "userA_id",
//         "content": "Hey, how's it going?Hey, how's it going?Hey, how's it going?",
//         "createdAt": "2025-03-06T00:00:00Z"
//     },
//     "createdAt": "2025-03-06T00:00:00Z",
//     "updatedAt": "2025-03-06T00:00:00Z"
// }, {
//     "_id": "conversationId3",
//     "users": [
//         "userA_id",
//         "userB_id"
//     ],
//     "lastMessage": {
//         "_id": "messageId1",
//         "sender": "userA_id",
//         "content": "Hey, how's it going?Hey, how's it going?Hey, how's it going?",
//         "createdAt": "2025-03-06T00:00:00Z"
//     },
//     "createdAt": "2025-03-06T00:00:00Z",
//     "updatedAt": "2025-03-06T00:00:00Z"
// }]

const MessageOverview = () => {
    const currentUser = useSelector(selectUser);
    const { data: conversations = [], refetch } = useGetConversations(currentUser);

    return (
        <ScrollView>
            {conversations.map((conversation) =>
                <MessagePreview
                    key={conversation._id}
                    message={conversation.lastMessage.content}
                    conversationId={conversation._id}
                    userIcon='https://randomuser.me/api/portraits/men/3.jpg'
                    userName={conversation.userDetails[0]._id} />)}
        </ScrollView>
    );
};

export default MessageOverview;