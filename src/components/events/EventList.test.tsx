import React from 'react';
import { render, fireEvent, waitFor, userEvent } from '@testing-library/react-native';
import { useTranslation } from "react-i18next";
import { EventDTO } from '@/dto/eventDTO';
import EventList from '@/components/events/EventList';


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

describe('EventList', () => {
    const { t } = useTranslation();
    
    const mockOnEventPress = jest.fn();
    const mockOnTagPress = jest.fn();

    const mockList : EventDTO[] = [
        {
            id: 1,
            name: "Test Event",
            description: "This is a test event.",
            startDate: "2025-01-01",
            endDate: "2025-01-02",
            location: "Test Location",
            owner: { id: "123", name: "Owner Name" },
            tags: ["test", "event"],
            comments: [],
            isMature: true
        },
        {
            id: 2,
            name: "Another Event",
            description: "This is another test event.",
            startDate: "2025-02-01",
            endDate: "2025-02-02",
            location: "Another Location",
            owner: { id: "456", name: "Owner Name 2" },
            tags: ["another", "event"],
            comments: [],
            isMature: false,
        }
    ];

    beforeEach(() => {
        mockOnEventPress.mockClear();
        mockOnTagPress.mockClear();
    });
    
    it('renders correctly with events', () => {
        const { getByText } = render(
            <EventList events={mockList} onEventPress={mockOnEventPress} onTagPress={mockOnTagPress} />
        );

        expect(getByText("Test Event")).toBeTruthy();
        expect(getByText("This is a test event.")).toBeTruthy();
        expect(getByText("2025-01-01 - 2025-01-02")).toBeTruthy();
        expect(getByText(`${t('location')} : Test Location`)).toBeTruthy();
        expect(getByText(`${t('owner')} : Owner Name`)).toBeTruthy();
    });

    it('calls onEventPress when an event is pressed', () => {
        const { getByText } = render(
            <EventList events={mockList} onEventPress={mockOnEventPress} onTagPress={mockOnTagPress} />
        );

        fireEvent.press(getByText("Test Event"));
        expect(mockOnEventPress).toHaveBeenCalledWith(mockList[0]);
    });

    it('calls onTagPress when a tag is pressed', () => {
        const { getByText } = render(
            <EventList events={mockList} onEventPress={mockOnEventPress} onTagPress={mockOnTagPress} />
        );

        fireEvent.press(getByText("#test"));
        expect(mockOnTagPress).toHaveBeenCalledWith("test");
    });
});