import React from 'react';
import { render, fireEvent, waitFor, userEvent } from '@testing-library/react-native';
import { useTranslation } from "react-i18next";
import EventDetails from './EventDetails';
import { EventDTO } from '@/dto/eventDTO';

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

describe('EventDetails', () => {
    const { t } = useTranslation();
    
    const mockOnEventPress = jest.fn();
    const mockOnTagPress = jest.fn();
    
    const mockEvent: EventDTO = {
        id: "1",
        name: "Test Event",
        description: "This is a test event.",
        startDate: "2025-01-01",
        endDate: "2025-01-02",
        location: "Test Location",
        owner: { id: "123", name: "Owner Name" },
        tags: ["test", "event"],
        comments: [],
        isMature: true
    };
    beforeEach(() => {
        mockOnEventPress.mockClear();
        mockOnTagPress.mockClear();
    });
    it('renders correctly with event details', () => {
        const { getByText } = render(
            <EventDetails event={mockEvent} onTagPress={mockOnTagPress} />
        );

        expect(getByText(mockEvent.name)).toBeTruthy();
        expect(getByText(mockEvent.description)).toBeTruthy();
        expect(getByText(`${mockEvent.startDate} - ${mockEvent.endDate}`)).toBeTruthy();
        expect(getByText(`${t('location')} : ${mockEvent.location}`)).toBeTruthy();
        expect(getByText(`${t('owner')} : ${mockEvent.owner.name}`)).toBeTruthy();
        mockEvent.tags.forEach(tag => {
            expect(getByText(`#${tag}`)).toBeTruthy();
        });
    });

    it('calls onTagPress when a tag is pressed', () => {
        const { getByText } = render(
            <EventDetails event={mockEvent} onTagPress={mockOnTagPress} />
        );

        const tagElement = getByText(`#${mockEvent.tags[0]}`);
        fireEvent.press(tagElement);
        expect(mockOnTagPress).toHaveBeenCalledWith(mockEvent.tags[0]);
    });
});
