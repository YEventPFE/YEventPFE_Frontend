import React from 'react';
import { render, fireEvent, waitFor, userEvent } from '@testing-library/react-native';
import { useTranslation } from "react-i18next";
import EventList from './EventList';


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

    const mockList = [
        {
            id: "1",
            name: "Test Event",
            description: "This is a test event.",
            ownerId: "owner1",
            date: "2025-01-01",
            location: "Test Location",
            startTime: "10:00",
            endTime: "12:00",
            isMature: false,
            tags: ["test", "event"]
        }
        , 
        {
            id: "2",
            name: "Sample Event",
            description: "This is a sample event.",
            ownerId: "owner2",
            date: "2025-01-02",
            location: "Sample Location",
            startTime: "14:00",
            endTime: "16:00",
            isMature: true,
            tags: ["sample", "event"]
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
        expect(getByText("Date: 2025-01-01")).toBeTruthy();
        expect(getByText("Location: Test Location")).toBeTruthy();
        expect(getByText("Time: 10:00 - 12:00")).toBeTruthy();
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