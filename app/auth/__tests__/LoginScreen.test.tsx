import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from 'react-query';
import LoginScreen from '../login';
import { useLoginMutation } from '@/hooks/queries/useLoginMutation';

jest.mock('@/hooks/queries/useLoginMutation', () => ({
    useLoginMutation: jest.fn(),
}));

jest.mock('react-native-paper', () => {
    const RNPaper = jest.requireActual('react-native-paper');
    return {
        ...RNPaper,
        useTheme: () => ({
            colors: {
                primary: '#000',
                secondary: '#fff',
            },
        }),
    };
});

const createTestQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

describe('LoginScreen', () => {
    let mockMutate: jest.Mock;

    beforeEach(() => {
        mockMutate = jest.fn();
        (useLoginMutation as jest.Mock).mockReturnValue({
            mutate: mockMutate,
        });
    });

    const renderComponent = () => {
        const testQueryClient = createTestQueryClient();
        return render(
            <QueryClientProvider client={testQueryClient}>
                <PaperProvider>
                    <LoginScreen />
                </PaperProvider>
            </QueryClientProvider>
        );
    };

    it('renders correctly with initial values', () => {
        const { getByLabelText, getByTestId } = renderComponent();

        const emailInput = getByTestId('email-field');
        const passwordInput = getByTestId('password-field');
        const loginButton = getByTestId('login-button');

        expect(emailInput).toBeTruthy();
        expect(passwordInput).toBeTruthy();
        expect(loginButton).toBeTruthy();

        expect(emailInput.props.value).toBe('test@test.test');
    });

    it('validates email input', async () => {
        const { getByTestId, getByText } = renderComponent();

        const emailInput = getByTestId('email-field');
        const loginButton = getByTestId('login-button');

        fireEvent.changeText(emailInput, 'invalid-email');
        fireEvent.press(loginButton);

        await waitFor(() => {
            const errorMessage = getByText('Invalid email');
            expect(errorMessage).toBeTruthy();
        });
    });

    it('validates password input', async () => {
        const { getByText, getByTestId } = renderComponent();

        const passwordInput = getByTestId('password-field');
        const loginButton = getByTestId('login-button');

        fireEvent.changeText(passwordInput, '');
        fireEvent.press(loginButton);

        await waitFor(() => {
            const errorMessage = getByText('Password is required');
            expect(errorMessage).toBeTruthy();
        });
    });

    it('submits form with valid credentials', async () => {
        const { getByText, getByTestId } = renderComponent();

        const emailInput = getByTestId('email-field');
        const passwordInput = getByTestId('password-field');
        const loginButton = getByTestId('login-button');

        fireEvent.changeText(emailInput, 'test@example.com');
        fireEvent.changeText(passwordInput, 'validpassword');
        fireEvent.press(loginButton);

        await waitFor(() => {
            expect(mockMutate).toHaveBeenCalledWith({
                username: 'test@example.com',
                password: 'validpassword',
            });
        });
    });

    it('does not submit form with invalid credentials', async () => {
        const { getByText, getByTestId } = renderComponent();

        const emailInput = getByTestId('email-field');
        const passwordInput = getByTestId('password-field');
        const loginButton = getByTestId('login-button');

        fireEvent.changeText(emailInput, 'invalid-email');
        fireEvent.changeText(passwordInput, '');
        fireEvent.press(loginButton);

        await waitFor(() => {
            expect(mockMutate).not.toHaveBeenCalled();

            const emailErrorMessage = getByText('Invalid email');
            const passwordErrorMessage = getByText('Password is required');

            expect(emailErrorMessage).toBeTruthy();
            expect(passwordErrorMessage).toBeTruthy();
        });
    });
}); 