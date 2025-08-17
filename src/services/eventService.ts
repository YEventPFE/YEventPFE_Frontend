import { CreatedEventDTO, EventDTO } from "@/dto/eventDTO";
import { normalizeDotNetJson } from "@/utils/deserializeHelper";

export const getEventById = async (id: string): Promise<EventDTO> => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error('API URL is not defined');
  }
  const response = await fetch(`${apiUrl}/events/Get/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  if (!response.ok) {
    const bodyMessage = await response.text();
    throw new Error('Failed to fetch event: ' + bodyMessage);
  }
  const rawEvent = await response.json();
  const event: EventDTO = normalizeDotNetJson<EventDTO>(rawEvent);
  return event;
}

export const getEvents = async (): Promise<EventDTO[]> => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error('API URL is not defined');
  }

  const response = await fetch(`${apiUrl}/events`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) {
    const bodyMessage = await response.text();
    throw new Error('Failed to fetch events: ' + bodyMessage);
  }

  const events: EventDTO[] = await response.json();
  return events;
}

export const getForthcomingEventsByOwner = async (token: string): Promise<EventDTO[]> => {
    if (!token) {
        throw new Error('Token is required');
    }

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error('API URL is not defined');
  }

  const response = await fetch(`${apiUrl}/events/MyPastEvents`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
  });

  console.debug("response :", response);
  if (!response.ok) {
    const bodyMessage = await response.text();
    throw new Error('Failed to fetch events by owner: ' + bodyMessage);
  }

  const events: EventDTO[] = await response.json();
  return events;
};

export const getRandomEvents = async (count: number): Promise<EventDTO[]> => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error('API URL is not defined');
  }

  const response = await fetch(`${apiUrl}/events/GetRandomEvents?count=${count}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) {
    const bodyMessage = await response.text();
    throw new Error('Failed to fetch random events: ' + bodyMessage);
  }

  const rawEvents = await response.json();
  const events: EventDTO[] = normalizeDotNetJson<EventDTO[]>(rawEvents);
  return events;
};

export const createEvent = async (token: string, event: CreatedEventDTO): Promise<EventDTO> => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error('API URL is not defined');
  }

  const response = await fetch(`${apiUrl}/events/Add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(event)
  });

  if (!response.ok) {
    const bodyMessage = await response.text();
    throw new Error('Failed to create event: ' + bodyMessage);
  }
  const rawEvent = await response.json();
  const deserializedEvent: EventDTO = normalizeDotNetJson<EventDTO>(rawEvent);
  return deserializedEvent;
}