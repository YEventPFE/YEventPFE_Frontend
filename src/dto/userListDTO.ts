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
