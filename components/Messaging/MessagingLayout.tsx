import React from 'react';
import { ScrollView, View } from 'react-native';
import Message from './Message';

const MessagingLayout = () => {
    return (
        <ScrollView style={{ flex: 1 }}>
            <Message
                authorName="John Doe"
                authorIconUri="https://randomuser.me/api/portraits/men/1.jpg"
                authorId="1"
                messageContent="Hey, how are you?"
                isSent={false}
            />
            <Message
                authorName="Me"
                authorIconUri="https://randomuser.me/api/portraits/men/2.jpg"
                authorId="2"
                messageContent="I'm good, thanks!"
                isSent={true}
            />
        </ScrollView>
    );
};

export default MessagingLayout;
