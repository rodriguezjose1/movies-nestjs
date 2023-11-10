export declare enum Role {
    User = "regular",
    Admin = "administrator"
}
export interface User {
    userId: number;
    username: string;
    password: string;
    roles: Role[];
}
