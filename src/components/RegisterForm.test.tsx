import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useTranslation } from "react-i18next";
import RegisterForm from './RegisterForm';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    }
  },
}));

describe('RegisterForm', () => {
    const mockOnSubmit = jest.fn();

    const { t } = useTranslation();

    beforeEach(() => {
        mockOnSubmit.mockClear();
    });

    it('renders correctly', () => {
        const { getByPlaceholderText, getByText } = render(<RegisterForm onSubmit={mockOnSubmit} />);
        
        expect(getByPlaceholderText(t('username'))).toBeTruthy();
        expect(getByPlaceholderText(t('password'))).toBeTruthy();
        expect(getByPlaceholderText(t('email'))).toBeTruthy();
        expect(getByText(t('register'))).toBeTruthy();
    });

    it('calls onSubmit with correct parameters', async () => {
        const { getByPlaceholderText, getByText } = render(<RegisterForm onSubmit={mockOnSubmit} />);
        
        fireEvent.changeText(getByPlaceholderText(t('username')), 'testuser');
        fireEvent.changeText(getByPlaceholderText(t('password')), 'password123');
        fireEvent.changeText(getByPlaceholderText(t('email')), 'testuser@example.com');

        fireEvent.press(getByText(t('register')));

        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledWith(
                'testuser',
                'password123',
                'testuser@example.com',
                expect.any(Date),
                expect.any(String)
            );
        });
    });

    it('shows error message on registration failure', async () => {
        const errorMessage = 'Registration failed';
        mockOnSubmit.mockRejectedValue(new Error(errorMessage));

        const { getByPlaceholderText, getByText } = render(<RegisterForm onSubmit={mockOnSubmit} />);
        
        fireEvent.changeText(getByPlaceholderText(t('username')), 'testuser');
        fireEvent.changeText(getByPlaceholderText(t('password')), 'password123');
        fireEvent.changeText(getByPlaceholderText(t('email')), 'testuser@example.com');

        fireEvent.press(getByText(t('register')));

        await waitFor(() => {
            expect(getByText(errorMessage)).toBeTruthy();
        });
        expect(mockOnSubmit).toHaveBeenCalledWith(
            'testuser',
            'password123',
            'testuser@example.com',
            expect.any(Date),
            expect.any(String)
        );
        expect(getByText(errorMessage)).toBeTruthy();
    });
    
    it('shows loading state while submitting', async () => {
        const { getByText } = render(<RegisterForm onSubmit={mockOnSubmit} />);
        
        fireEvent.press(getByText(t('register')));
        
        expect(getByText(t('loading'))).toBeTruthy();
        expect(mockOnSubmit).toHaveBeenCalled();
    });
});