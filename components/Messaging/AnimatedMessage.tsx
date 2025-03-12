import React from "react";
import { useRef } from "react";
import { Animated } from "react-native";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/selectors/authSelectors";

const AnimatedMessage = ({ item, index, messagesLength }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const currentUser = useSelector(selectUser);

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
                authorIconUri={"https://randomuser.me/api/portraits/men/3.jpg"}
                authorId={item.authorId}
                messageContent={item.content}
                isSent={currentUser === item.sender}
            />
        </Animated.View>
    );
};
export default AnimatedMessage;