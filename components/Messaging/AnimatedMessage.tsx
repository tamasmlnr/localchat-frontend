import React from "react";
import { useRef } from "react";
import { Animated } from "react-native";
import Message from "./Message";

const AnimatedMessage = ({ item, index, messagesLength }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        if (index === messagesLength - 1) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            fadeAnim.setValue(1);
        }
    }, [fadeAnim, index, messagesLength]);

    return (
        <Animated.View style={{ opacity: fadeAnim }}>
            <Message
                authorName={item.authorName}
                authorIconUri={item.authorIconUri}
                authorId={item.authorId}
                messageContent={item.messageContent}
                isSent={item.isSent}
            />
        </Animated.View>
    );
};
export default AnimatedMessage;