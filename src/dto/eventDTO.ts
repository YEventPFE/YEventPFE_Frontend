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