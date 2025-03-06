import { Platform } from "react-native";

export const SERVER_URL =
    Platform.OS === 'android' && __DEV__
        ? process.env.SERVER_URL_ANDROID 
        : process.env.SERVER_URL_PROD;  
