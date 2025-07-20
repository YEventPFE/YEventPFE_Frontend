export type EventDTO = {
    id: string;
    name: string;
    description: string;
    ownerId: string;
    date: string;
    location: string;
    startTime: string;
    endTime: string;
    isMature: boolean;
    tags: string[];
}