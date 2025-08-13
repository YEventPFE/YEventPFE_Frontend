import { UserDTO } from "./userDTO";

export type FriendRequestDTO = {
    id: string;
    sender: UserDTO;
    receiver: UserDTO;
    lastUpdate: Date;
    status: FriendRequestStatus;
}

export enum FriendRequestStatus {
    Pending = 0,
    Accepted = 1,
    Declined = 2
}