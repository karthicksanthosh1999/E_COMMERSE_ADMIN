export interface User {
    id?: string;
    name: string;
    email: string;
    phone: string;
    passwordHash?: string;
    role?: ROLE;
    status?: ROLE;
    createdAt?: string;
} 

export enum ROLE {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export enum USER_STATUS {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}

export interface ILoginUser {
    email: string;
    passwordHash: string;
}