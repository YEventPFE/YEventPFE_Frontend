import React, { createContext, useContext, useState } from 'react';
import { EventDTO } from '@/dto/eventDTO';

type EventContextType = {
  selectedEvent: EventDTO | null;
  setSelectedEvent: (event: EventDTO) => void;
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedEvent, setSelectedEvent] = useState<EventDTO | null>(null);

  return (
    <EventContext.Provider value={{ selectedEvent, setSelectedEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = (): EventContextType => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEventContext must be used within an EventProvider');
  }
  return context;
};
