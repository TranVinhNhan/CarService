import { CheckoutDetail } from './checkoutDetail';
import { ShoppingCartItem } from './shoppingcartitem';

export class Order {
    userId: number;
    productOrderForCreationDto: CheckoutDetail;
    productOrderDetailForCreationDtos: ShoppingCartItem[];
}
