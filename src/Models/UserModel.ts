export enum UserRole {
    Admin, User
}

export interface UserModel{
    userID:number;
    firstName: string; 
    lastName: string;
    email: string;
    password: string;
    role: UserRole
}


