import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from 'react-query';
import RegisterScreen from '../register';
import { useRegisterUser } from '@/hooks/queries/useRegisterMutation';

jest.mock('@/hooks/queries/useRegisterMutation', () => ({
    useRegisterUser: jest.fn(),
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

describe('RegisterScreen', () => {
    let mockMutateAsync: jest.Mock;

    beforeEach(() => {
        mockMutateAsync = jest.fn();
        (useRegisterUser as jest.Mock).mockReturnValue({
            mutateAsync: mockMutateAsync,
        });
    });

    const renderComponent = () => {
        const testQueryClient = createTestQueryClient();
        return render(
            <QueryClientProvider client={testQueryClient}>
                <PaperProvider>
                    <RegisterScreen />
                </PaperProvider>
            </QueryClientProvider>
        );
    };

    it('renders all input fields correctly', () => {
        const { getByTestId, getByText } = renderComponent();

        expect(getByTestId('email-field')).toBeTruthy();
        expect(getByTestId('fullname-field')).toBeTruthy();
        expect(getByTestId('password-field')).toBeTruthy();
        expect(getByTestId('password-confirmation-field')).toBeTruthy();
        expect(getByText('Register')).toBeTruthy();
    });

    it('validates email input', async () => {
        const { getByTestId, getByText } = renderComponent();

        const emailInput = getByTestId('email-field');
        const registerButton = getByText('Register');

        fireEvent.changeText(emailInput, 'invalid-email');
        fireEvent.press(registerButton);

        await waitFor(() => {
            const errorMessage = getByText('Invalid email');
            expect(errorMessage).toBeTruthy();
        });
    });

    it('validates name input', async () => {
        const { getByTestId, getByText } = renderComponent();

        const nameInput = getByTestId('fullname-field');
        const registerButton = getByText('Register');

        fireEvent.changeText(nameInput, '');
        fireEvent.press(registerButton);

        await waitFor(() => {
            const errorMessage = getByText('Name is required');
            expect(errorMessage).toBeTruthy();
        });
    });

    it('validates password input', async () => {
        const { getByTestId, getByText } = renderComponent();

        const passwordInput = getByTestId('password-field');
        const registerButton = getByText('Register');

        fireEvent.changeText(passwordInput, '12345');
        fireEvent.press(registerButton);

        await waitFor(() => {
            const errorMessage = getByText('Password must be at least 6 characters');
            expect(errorMessage).toBeTruthy();
        });
    });

    it('validates password confirmation', async () => {
        const { getByTestId, getByText } = renderComponent();

        const passwordInput = getByTestId('password-field');
        const passwordConfirmInput = getByTestId('password-confirmation-field');
        const registerButton = getByText('Register');

        fireEvent.changeText(passwordInput, 'password123');
        fireEvent.changeText(passwordConfirmInput, 'differentpassword');
        fireEvent.press(registerButton);

        await waitFor(() => {
            const errorMessage = getByText('Passwords must match');
            expect(errorMessage).toBeTruthy();
        });
    });

    it('submits form with valid credentials', async () => {
        const { getByTestId, getByText } = renderComponent();

        const emailInput = getByTestId('email-field');
        const nameInput = getByTestId('fullname-field');
        const passwordInput = getByTestId('password-field');
        const passwordConfirmInput = getByTestId('password-confirmation-field');
        const registerButton = getByText('Register');

        fireEvent.changeText(emailInput, 'test@example.com');
        fireEvent.changeText(nameInput, 'John Doe');
        fireEvent.changeText(passwordInput, 'password123');
        fireEvent.changeText(passwordConfirmInput, 'password123');
        fireEvent.press(registerButton);

        await waitFor(() => {
            expect(mockMutateAsync).toHaveBeenCalledWith({
                username: 'test@example.com',
                password: 'password123',
                name: 'John Doe',
            });
        });
    });

    it('handles registration error', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        mockMutateAsync.mockRejectedValue(new Error('Registration failed'));

        const { getByTestId, getByText } = renderComponent();

        const emailInput = getByTestId('email-field');
        const nameInput = getByTestId('fullname-field');
        const passwordInput = getByTestId('password-field');
        const passwordConfirmInput = getByTestId('password-confirmation-field');
        const registerButton = getByText('Register');

        fireEvent.changeText(emailInput, 'test@example.com');
        fireEvent.changeText(nameInput, 'John Doe');
        fireEvent.changeText(passwordInput, 'password123');
        fireEvent.changeText(passwordConfirmInput, 'password123');
        fireEvent.press(registerButton);

        await waitFor(() => {
            expect(mockMutateAsync).toHaveBeenCalled();
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                'Error during registration:',
                expect.any(Error)
            );
        });

        consoleErrorSpy.mockRestore();
    });
});