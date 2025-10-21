interface IUser {
    id: string,
    email: string,
    created_at: string,
    role?: 'user' | 'admin',
    isVerified: boolean,
    verificationToken?: string,
}

interface IUserToServer {
    email: string,
    password: string,
    [key: string]: string
}

interface IUserAuthorized {
    email: string,
    token?: string,
    [key: string]: string | undefined
}

export type {
    IUser,
    IUserToServer,
    IUserAuthorized,
}