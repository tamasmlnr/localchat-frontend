import React from 'react';
import { render } from '@testing-library/react-native';
import Message from '@/components/Messaging/Message';
import { theme } from '@/theme/theme';

describe('Message Component', () => {
    const mockProps = {
        authorName: 'John Doe',
        authorIconUri: 'https://example.com/avatar.jpg',
        authorId: 'user123',
        messageContent: 'Hello, world!',
        isSent: false,
    };

    test('renders received message correctly', () => {
        const { getByText, getByLabelText } = render(<Message {...mockProps} />);

        expect(getByText('John Doe')).toBeTruthy();
        expect(getByText('Hello, world!')).toBeTruthy();
    });

    test('renders sent message correctly', () => {
        const sentProps = { ...mockProps, isSent: true };
        const { getByText, getByLabelText, queryByText } = render(<Message {...sentProps} />);

        expect(queryByText('John Doe')).toBeNull();
        expect(getByText('Hello, world!')).toBeTruthy();
    });

    test('applies correct styles for sent and received messages', () => {
        const { getByText, rerender } = render(<Message {...mockProps} />);
        const receivedMessage = getByText('Hello, world!');

        expect(receivedMessage).toHaveStyle({ color: theme.colors.tertiary });
        rerender(<Message {...mockProps} isSent={true} />);
        const sentMessage = getByText('Hello, world!');
        expect(sentMessage).toHaveStyle({ color: theme.colors.secondary });
    });
});
