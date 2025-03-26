import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/store/selectors/authSelectors";
import * as ImagePicker from "expo-image-picker";
import { uploadPhoto } from "@/services/userService";
import ThemedButton from "./ThemedButton";
import { useGetUserDetails } from "@/hooks/queries/useGetUserDetails";
import ProfilePhotoIcon from "./ProfilePhotoIcon";
import LoadingIndicator from "./LoadingIndicator";
import { showSnackbar } from "@/store/snackbarSlice";

const PhotoUpload = () => {
    const userId = useSelector(selectUser);
    const { data: currentUser, refetch, isFetching } = useGetUserDetails(userId ?? '');
    const [loading, setLoading] = useState(false);
    const screenWidth = Dimensions.get("window").width;
    const imageIdFromUsername = userId?.replace(/[.@]/g, '');
    const dispatch = useDispatch();

    const handleImageUpload = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            dispatch(showSnackbar("Permission to access gallery is required!"));
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (result.canceled) {
            return;
        }

        const uri = result.assets[0].uri;
        const formData = new FormData();

        formData.append("image", {
            uri: uri,
            name: `${imageIdFromUsername}.jpg`,
            type: 'image/jpeg'
        } as unknown as Blob, `${imageIdFromUsername}.jpg`);

        formData.append("userId", userId ?? '');

        try {
            setLoading(true);
            const res = await uploadPhoto(formData);
            refetch();
        } catch (error) {
            dispatch(showSnackbar("Failed to upload profile picture"));
        } finally {
            setLoading(false);
        }
    };

    const styles = StyleSheet.create({
        image: {
            width: screenWidth * 0.5,
            height: "auto",
            aspectRatio: 1,
            alignSelf: "center"
        },
    });

    return (
        <View>
            {loading || isFetching ? (
                <LoadingIndicator size={screenWidth * 0.5} />
            ) : (
                <ProfilePhotoIcon
                    source={currentUser?.profilePhotoUrl}
                    size={screenWidth * 0.5}
                />
            )}
            {currentUser?.profilePhotoUrl ? (
                <ThemedButton
                    onPress={handleImageUpload}
                    disabled={isFetching}
                >
                    Change profile picture
                </ThemedButton>
            ) : (
                <ThemedButton
                    onPress={handleImageUpload}
                    disabled={isFetching}
                >
                    Upload profile picture
                </ThemedButton>
            )}
        </View>
    );
};

export default PhotoUpload;