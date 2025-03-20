import React from 'react';
import { View, Image, StyleSheet, DimensionValue } from "react-native";

interface ProfilePhotoIconProps {
    size: DimensionValue;
    source?: string
}

const ProfilePhotoIcon = ({ size, source }: ProfilePhotoIconProps) => {
    const styles = StyleSheet.create({
        circularImage: {
            width: size, height: size, aspectRatio: 1, alignSelf: "center", borderRadius: 100
        },
    });

    return (
        <View>
            <Image source={source ? { uri: source } : require("@/assets/images/avatar.png")} style={styles.circularImage} />
        </View>
    );
};

export default ProfilePhotoIcon;