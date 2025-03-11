import { Platform } from "react-native";

export const SERVER_URL =
    Platform.OS === 'android' && __DEV__
        ? process.env.EXPO_PUBLIC_SERVER_URL_ANDROID
        : process.env.EXPO_PUBLIC_SERVER_URL_PROD;  
