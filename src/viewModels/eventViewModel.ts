import { EventDTO, CreatedEventDTO } from "@/dto/eventDTO";
import { createEvent as createEventService } from "@/services/eventService";
import { getUser } from "@/viewModels/authViewModel";

export const createEvent = async (event: CreatedEventDTO) => {
    const user = await getUser();
    if (!user || !user.token) {
        throw new Error('User is not authenticated');
    }
    return await createEventService(user.token, event);
};
