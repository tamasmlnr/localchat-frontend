import React, { useState } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/selectors/authSelectors";
import * as ImagePicker from "expo-image-picker";
import { uploadPhoto } from "@/services/userService";
import ThemedButton from "./ThemedButton";
import { useGetUserDetails } from "@/hooks/queries/useGetUserDetails";
import ProfilePhotoIcon from "./ProfilePhotoIcon";
import LoadingIndicator from "./LoadingIndicator";

const UploadScreen = () => {
    const userId = useSelector(selectUser);
    const { data: currentUser, refetch, isFetching } = useGetUserDetails(userId ?? '');
    const [loading, setLoading] = useState(false);
    const screenWidth = Dimensions.get("window").width;
    const imageIdFromUsername = userId?.replace(/[.@]/g, '');

    const handleImageUpload = async () => {
        setLoading(true);
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Permission to access gallery is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (result.canceled) {
            return;
        }

        const uri = result.assets[0].uri;

        const formData = new FormData();
        formData.append("image", {
            uri,
            type: "image/jpeg",
            name: `${imageIdFromUsername}.jpg`,
        });
        formData.append("userId", userId);

        try {
            const res = await uploadPhoto(formData);
            refetch()
        } catch (error) {
            console.log(error);
            console.error("Upload failed", error);
        } finally {
            setLoading(false);
        }
    };

    const styles = StyleSheet.create({
        image: {
            width: screenWidth * 0.5, height: "auto", aspectRatio: 1, alignSelf: "center"
        },
    });

    return (
        <View>
            {loading || isFetching ? <LoadingIndicator size={screenWidth * 0.5} /> : <ProfilePhotoIcon source={currentUser?.profilePhotoUrl} size={screenWidth * 0.5} />}
            {currentUser?.profilePhotoUrl ? <ThemedButton onPress={handleImageUpload} disabled={isFetching}>Change profile picture</ThemedButton> :
                <>
                    <ThemedButton onPress={handleImageUpload} disabled={isFetching}>Upload profile picture</ThemedButton>
                </>}
        </View >
    );

};

export default UploadScreen;
