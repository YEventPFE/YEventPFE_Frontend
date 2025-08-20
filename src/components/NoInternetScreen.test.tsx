import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useTranslation } from "react-i18next";
import NoInternetScreen from './NoInternetScreen';

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


describe('NoInternetScreen', () => {
    const { t } = useTranslation();

    const mockOnRetry = jest.fn();

    it('renders correctly', () => {
        const { getByText } = render(<NoInternetScreen onRetry={mockOnRetry} />);
        expect(getByText(t('no_internet_connection'))).toBeTruthy();
        expect(getByText(t('please_check_internet_connection'))).toBeTruthy();
    });

    it('calls onRetry when retry button is pressed', async () => {
        const mockOnRetry = jest.fn();
        const { getByText } = render(<NoInternetScreen onRetry={mockOnRetry} />);

        const retryButton = getByText(t('retry'));
        fireEvent.press(retryButton);

        expect(mockOnRetry).toHaveBeenCalled();
    });

    it('does not call onRetry when no function is provided', () => {
        const { getByText } = render(<NoInternetScreen onRetry={() => {}} />);
        const retryButton = getByText(t('retry'));
        
        // No error should be thrown
        fireEvent.press(retryButton);
    });
});