import React from 'react';
import { render, fireEvent, waitFor, userEvent } from '@testing-library/react-native';
import { useTranslation } from "react-i18next";
import LoginForm from './LoginForm';


jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
        // You can include here any property your component may use
      },
    }
  },
}))


describe('LoginForm', () => {
    const { t } = useTranslation();
    
    const mockOnSubmit = jest.fn();

    beforeEach(() => {
        mockOnSubmit.mockClear();
    });

    it('renders correctly with default props', () => {
        const { getByPlaceholderText, getByText } = render(
            <LoginForm onSubmit={mockOnSubmit} />
        );

        expect(getByPlaceholderText(t('username'))).toBeTruthy();
        expect(getByPlaceholderText(t('password'))).toBeTruthy();
        expect(getByText(t('login'))).toBeTruthy();
    });

    it('calls onSubmit with username and password when login button is pressed', async () => {
        const { getByPlaceholderText, getByText } = render(
            <LoginForm onSubmit={mockOnSubmit} />
        );

        const usernameInput = getByPlaceholderText(t('username'));
        const passwordInput = getByPlaceholderText(t('password'));
        const loginButton = getByText(t('login'));
        
        // Simulate user input
        fireEvent.changeText(usernameInput, 'testuser');
        fireEvent.changeText(passwordInput, 'testpass');
        fireEvent.press(loginButton);

        expect(mockOnSubmit).toHaveBeenCalledWith('testuser', 'testpass');
    });

    it('shows error message when onSubmit fails', async () => {
        const errorMessage = 'Login failed';
        mockOnSubmit.mockRejectedValue(new Error(errorMessage));

        const { getByPlaceholderText, getByText } = render(
            <LoginForm onSubmit={mockOnSubmit} />
        );

        const usernameInput = getByPlaceholderText(t('username'));
        const passwordInput = getByPlaceholderText(t('password'));
        const loginButton = getByText(t('login'));

        // Simulate user input
        fireEvent.changeText(usernameInput, 'testuser');
        fireEvent.changeText(passwordInput, 'testpass');
        fireEvent.press(loginButton);
        
        await waitFor(() => {
            expect(getByText(errorMessage)).toBeTruthy();
        });
    });
});