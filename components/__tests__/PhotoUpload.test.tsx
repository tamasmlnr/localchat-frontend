import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { useGetUserDetails } from "@/hooks/queries/useGetUserDetails";
import * as ImagePicker from "expo-image-picker";
import { uploadPhoto } from "@/services/userService";
import PhotoUpload from "@/components/PhotoUpload";
import { showSnackbar } from "@/store/snackbarSlice";

// Replace the existing mock with this:
// Replace the existing mock with this:
jest.mock("@/hooks/queries/useGetUserDetails", () => ({
    __esModule: true,
    useGetUserDetails: jest.fn(),
}));

const mockUseGetUserDetails = require("@/hooks/queries/useGetUserDetails").useGetUserDetails;
jest.mock("expo-image-picker");
jest.mock("@/services/userService", () => ({
    uploadPhoto: jest.fn(),
}));
// Mock FormData
global.FormData = jest.fn().mockImplementation(() => ({
    append: jest.fn()
}));

const mockStore = configureStore([]);
const store = mockStore({
    auth: { user: "testuser@example.com" },
});


describe("PhotoUpload Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders upload button when no profile photo exists", () => {
        mockUseGetUserDetails.mockReturnValue({
            data: { profilePhotoUrl: null },
            refetch: jest.fn(),
            isFetching: false,
        });

        render(
            <Provider store={store}>
                <PhotoUpload />
            </Provider>
        );

        expect(screen.getByTestId("upload-photo-button")).toBeTruthy();
    });

    test("renders change button when profile photo exists", () => {
        mockUseGetUserDetails.mockReturnValue({
            data: { profilePhotoUrl: "https://example.com/photo.jpg" },
            refetch: jest.fn(),
            isFetching: false,
        });

        render(
            <Provider store={store}>
                <PhotoUpload />
            </Provider>
        );

        expect(screen.getByTestId("update-photo-button")).toBeTruthy();
    });

    test("shows loading indicator while fetching user data", () => {
        mockUseGetUserDetails.mockReturnValue({
            data: null,
            refetch: jest.fn(),
            isFetching: true,
        });

        render(
            <Provider store={store}>
                <PhotoUpload />
            </Provider>
        );

        expect(screen.getByTestId("loading-indicator")).toBeTruthy();
    });

    test("dispatches snackbar when permission is denied", async () => {
        const mockDispatch = jest.fn();
        store.dispatch = mockDispatch;
        mockUseGetUserDetails.mockReturnValue({
            data: { profilePhotoUrl: null },
            refetch: jest.fn(),
            isFetching: false,
        });

        (ImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock).mockResolvedValue({
            status: "denied",
            granted: false,
        });

        render(
            <Provider store={store}>
                <PhotoUpload />
            </Provider>
        );

        fireEvent.press(screen.getByTestId("upload-photo-button"));

        await waitFor(() => {
            expect(mockDispatch).toHaveBeenCalledWith(
                showSnackbar("Permission to access gallery is required!")
            );
        });
    });

    test("calls uploadPhoto service on valid image selection", async () => {
        const mockRefetch = jest.fn();
        mockUseGetUserDetails.mockImplementation(() => ({
            data: { profilePhotoUrl: null },
            refetch: mockRefetch,
            isFetching: false,
            isLoading: false,
            error: null
        }));

        (ImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock).mockResolvedValue({
            status: "granted",
            granted: true,
        });

        (ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValue({
            canceled: false,
            assets: [{ uri: "file://image.jpg" }],
        });

        (uploadPhoto as jest.Mock).mockResolvedValue({ success: true });

        render(
            <Provider store={store}>
                <PhotoUpload />
            </Provider>
        );

        const uploadButton = await screen.findByTestId("upload-photo-button");
        fireEvent.press(uploadButton);

        await waitFor(() => {
            expect(uploadPhoto).toHaveBeenCalled();
        });


        expect(mockRefetch).toHaveBeenCalledTimes(1);

        await waitFor(() => {
            expect(screen.queryByTestId("loading-indicator")).toBeNull();
        });
    });
});
