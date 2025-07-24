import { UserDTO } from "./userDTO";

export type CommentDTO = {
    id: string;
    user: UserDTO;
    repliedTo?: CommentDTO;
    content: string;
    createdAt: Date;
}