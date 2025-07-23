export type EventDTO = {
    id: string;
    name: string;
    description: string;
    ownerId: string;
    startDate: string;
    endDate: string;
    location: string;
    isMature: boolean;
    tags: string[];
}