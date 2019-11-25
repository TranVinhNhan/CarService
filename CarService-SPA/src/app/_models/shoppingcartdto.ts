import { ShoppingCartService } from './shoppingcartservice';

export interface ShoppingCart {
    shoppingCartService: ShoppingCartService;
    itemCount: number;
    totalAmount: number;
}
