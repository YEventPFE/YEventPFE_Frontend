import { EventDTO } from "./eventDTO";
import { UserDTO } from "./userDTO";

export type CommentDTO = {
    id: number;
    user: UserDTO;
    repliedTo?: CommentDTO;
    event?: EventDTO;
    content: string;
    date: Date;
}

export type ReplyToCommentDTO = {
    commentId: number;
    content: string;
}

export type AddCommentDTO = {
    eventId: number;
    content: string;
}