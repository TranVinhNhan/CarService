import { ShoppingCartItem } from './shoppingcartitem';

export interface ShoppingCartService {
    id: string;
    shoppingCartItems: ShoppingCartItem[];
}
