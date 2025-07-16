interface IUser {
    id: string;
    email: string;
    created_at: string;
    role?: 'user' | 'admin';
}

export type {
    IUser,
}