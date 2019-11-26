import { User } from '../_models/User';
import { OrderItem } from './orderItem';

export interface ProductOrder {
    id: number;
    orderPlacedTime: Date;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    addressOptional?: string;
    status: string;
    orderTotal: number;
    user: User;
    productOrderDetails: OrderItem[];
}
