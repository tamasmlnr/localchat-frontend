import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

const MessageDetail = () => {
    const route = useRoute();
    //TODO
    //@ts-ignore
    const { messageId } = route.params;

    return (
        <View>
            <Text>Message Detail for {messageId}</Text>
        </View>
    );
};

export default MessageDetail;
