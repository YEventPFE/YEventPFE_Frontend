import { UserDTO } from "@/dto/userDTO";

export type EventDTO = {
    id: string;
    name: string;
    description: string;
    owner : UserDTO;
    startDate: string;
    endDate: string;
    location: string;
    isMature: boolean;
    tags: string[];
}


export type CreatedEventDTO = {
    name: string;
    startDate: Date;
    endDate: Date;
    location: string;
    description: string;
    isPublic?: boolean;
    isMature?: boolean;
    tags?: string[];
}