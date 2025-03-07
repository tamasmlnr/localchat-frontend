import React from 'react';
import MessagePreview from './MessagePreview';
import { ScrollView, View } from 'react-native';

const sampleMessages = [{
    "_id": "conversationId1",
    "users": [
        "userA_id",
        "userB_id"
    ],
    "lastMessage": {
        "_id": "messageId1",
        "sender": "userA_id",
        "content": "Hey, how's it going?Hey, how's it going?Hey, how's it going?",
        "createdAt": "2025-03-06T00:00:00Z"
    },
    "createdAt": "2025-03-06T00:00:00Z",
    "updatedAt": "2025-03-06T00:00:00Z"
}, {
    "_id": "conversationId2",
    "users": [
        "userA_id",
        "userB_id"
    ],
    "lastMessage": {
        "_id": "messageId1",
        "sender": "userA_id",
        "content": "Hey, how's it going?Hey, how's it going?Hey, how's it going?",
        "createdAt": "2025-03-06T00:00:00Z"
    },
    "createdAt": "2025-03-06T00:00:00Z",
    "updatedAt": "2025-03-06T00:00:00Z"
}, {
    "_id": "conversationId3",
    "users": [
        "userA_id",
        "userB_id"
    ],
    "lastMessage": {
        "_id": "messageId1",
        "sender": "userA_id",
        "content": "Hey, how's it going?Hey, how's it going?Hey, how's it going?",
        "createdAt": "2025-03-06T00:00:00Z"
    },
    "createdAt": "2025-03-06T00:00:00Z",
    "updatedAt": "2025-03-06T00:00:00Z"
}]

const MessageOverview = () => {
    return (
        <ScrollView>
            {sampleMessages.map((message) =>
                <MessagePreview
                    key={message._id}
                    message={message.lastMessage.content}
                    conversationId={"1"}
                    userIcon='https://randomuser.me/api/portraits/men/3.jpg'
                    userName={message.lastMessage.sender} />)}
        </ScrollView>
    );
};

export default MessageOverview;