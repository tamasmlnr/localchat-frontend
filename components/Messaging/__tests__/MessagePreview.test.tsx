import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MessagePreview from '../MessagePreview';
import { useRouter } from 'expo-router';

jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
}));

describe('MessagePreview', () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    });

    it('should render the message preview correctly', () => {
        const { getByText, getByTestId } = render(
            <MessagePreview
                userIcon="https://example.com/avatar.jpg"
                userName="JohnDoe"
                message="Hello, how are you?"
                conversationId="12345"
            />
        );

        expect(getByText('JohnDoe')).toBeTruthy();
        expect(getByText('Hello, how are you?')).toBeTruthy();

        expect(getByTestId('avatar-JohnDoe')).toBeTruthy();
    });

    it('should navigate to the correct conversation on press', () => {
        const { getByTestId } = render(
            <MessagePreview
                userIcon="https://example.com/avatar.jpg"
                userName="John Doe"
                message="Hello, how are you?"
                conversationId="12345"
            />
        );

        fireEvent.press(getByTestId('message-preview-12345'));


        expect(mockPush).toHaveBeenCalledWith({
            pathname: `/(tabs)/messages/[conversationId]`,
            params: { conversationId: '12345', userName: 'John Doe' },
        });
    });
});
