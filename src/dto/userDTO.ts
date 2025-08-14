import { CommentDTO } from "./commentDTO";
import { FriendRequestStatus } from "./friendDTO";

export type UserDTO = {
    id: string;
    name: string;
}

export type UserListDTO = {
    id: string;
    name: string;
    groupOwner : UserDTO;
    members: UserDTO[];
};

export type UserProfileDTO = {
    id: string;
    name: string;
    birthDate: Date;
    publicComments: CommentDTO[];
    friendRequestStatus?: FriendRequestStatus;
}