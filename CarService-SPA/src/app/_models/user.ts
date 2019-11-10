export interface User {
    id: number;
    username: string;
    role: string;
    created: Date;
    lastActive: Date;
    firstName: string;
    lastName: string;
    gender: string;
    email: string
    phoneNumber: string;
    address: string;
    paymentCardNumber?: string
}