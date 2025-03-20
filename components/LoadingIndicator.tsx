import React, { useEffect } from 'react';
import { View, Animated, Easing, StyleSheet, DimensionValue } from 'react-native';
import { ThemedText } from './ThemedText';

interface LoadingIndicatorProps {
    size?: DimensionValue,
    showText?: boolean
}

const LoadingIndicator = ({ size = 100, showText = true }: LoadingIndicatorProps) => {
    const rotateAnimation = new Animated.Value(0);

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotateAnimation, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const spin = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <Animated.Text
                style={[
                    styles.sunEmoji,
                    { transform: [{ rotate: spin }] }
                ]}
            >
                ☀️
            </Animated.Text>
            {showText && <ThemedText>Loading...</ThemedText>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center"
    },
    sunEmoji: {
        fontSize: 40,
    },
});

export default LoadingIndicator;