export type LoginDTO = {
  name: string;
  password: string;
}
export type RegisterDTO = {
    name: string;
    password: string;
    email: string;
    birthdate: Date;
    phoneNumber: string;
};

export type LoginResponse = {
    token: string;
    user: {
        id: string;
        name: string;
    };
};

export type RegisterResponse = {
    success: boolean;
    message: string;
};