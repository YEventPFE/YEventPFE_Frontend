import { CommentDTO } from "./commentDTO";

export type UserDTO = {
    id: string;
    name: string;
}

export type UserListDTO = {
    id: string;
    name: string;
    isPublic: boolean;
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

export enum FriendRequestStatus {
    Pending = 0,
    Accepted = 1,
    Declined = 2
}