import { AddCommentDTO, CommentDTO, ReplyToCommentDTO } from "@/dto/commentDTO";
import { EventDTO, CreatedEventDTO } from "@/dto/eventDTO";
import { createEvent as createEventService } from "@/services/eventService";
import { replyToComment as replyToCommentService, addComment as addCommentService } from "@/services/commentService";
import { getUser } from "@/viewModels/authViewModel";
import { Router } from "expo-router";

export const createEvent = async (event: CreatedEventDTO) => {
    const user = await getUser();
    if (!user || !user.token) {
        throw new Error('User is not authenticated');
    }
    return await createEventService(user.token, event);
};

export const addComment = async (comment: AddCommentDTO) : Promise<CommentDTO> => {
    const user = await getUser();
    if (!user || !user.token) {
        throw new Error('User is not authenticated');
    }
    return await addCommentService(user.token, comment);
};

export const replyToComment = async (comment: ReplyToCommentDTO) : Promise<CommentDTO> => {
    const user = await getUser();
    if (!user || !user.token) {
        throw new Error('User is not authenticated');
    }
    
    return await replyToCommentService(user.token, comment);
};

export const goToEventByComment = async (router: Router, comment: CommentDTO) : Promise<void> => {
    if (!comment.event || !comment.event.id) {
        console.error("No event associated with comment:", comment);
        return;
    }
    router.push(`/event/${comment.event.id}`);
};