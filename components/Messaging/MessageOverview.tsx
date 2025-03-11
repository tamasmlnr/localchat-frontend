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
    console.log(conversations);
    const sampleMessage = [{ "_id": "67d0679b5371d50e5594c722", "isWrittenByUser": true, "lastMessage": { "_id": "67d06a746fd65a4508021272", "content": "awd", "createdAt": "2025-03-11T16:53:08.674Z", "receiver": "test2@test2.test", "sender": "test@test.test" }, "userDetails": [[Object], [Object]], "users": ["test@test.test", "test2@test2.test"] }]
    console.log(conversations[0]?.userDetails);
    return (
        <ScrollView>
            {conversations.map((message) =>
                <MessagePreview
                    key={message._id}
                    message={message.lastMessage.content}
                    conversationId={"1"}
                    userIcon='https://randomuser.me/api/portraits/men/3.jpg'
                    userName={message.userDetails[0].name} />)}
        </ScrollView>
    );
};

export default MessageOverview;