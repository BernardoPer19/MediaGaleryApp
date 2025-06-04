export interface UserType {
    user_id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
}
export type RegisterType = Omit<UserType, "user_id" | "createdAt">