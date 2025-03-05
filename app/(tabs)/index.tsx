import useLoadAuthState from "@/hooks/useLoadAuthState";
import { Redirect } from "expo-router";
import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";

export default function HomeScreen() {
  const rotation = useRef(new Animated.Value(0)).current;
  const user = useLoadAuthState();

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, [rotation]);

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const screenWidth = Dimensions.get("window").width;

  return (
    !user ? <Redirect href="/auth" /> : <View style={styles.container}>
      <Animated.Text
        style={[
          styles.sun,
          {
            transform: [{ rotate: rotateInterpolate }],
            fontSize: screenWidth * 0.05,
          },
        ]}
      >
        🌞
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  sun: {
    fontWeight: "bold",
  },
});
