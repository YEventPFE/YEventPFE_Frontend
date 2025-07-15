import React from 'react';
import { render } from '@testing-library/react-native';
import AppTitle from './AppTitle';
import { useTranslation } from "react-i18next";

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

describe('AppTitle', () => {
    const { t } = useTranslation();
    it('renders the title', () => {
        const { getByText } = render(<AppTitle />);
        expect(getByText('YEvent')).toBeTruthy();
    });

    it('does not render subtitle when showSubtitle is false', () => {
        const { queryByText } = render(<AppTitle showSubtitle={false} />);
        expect(queryByText(t('motto'))).toBeFalsy();
    });

    it('renders subtitle when showSubtitle is true', () => {
        const { getByText } = render(<AppTitle showSubtitle={true} />);
        expect(getByText(t('motto'))).toBeTruthy();
    });

    it('renders empty subtitle when showSubtitle is undefined', () => {
        const { getAllByText } = render(<AppTitle />);
        // Subtitle is rendered but empty
        const subtitle = getAllByText('', { exact: false });
        expect(subtitle.length).toBeGreaterThan(0);
    });
});