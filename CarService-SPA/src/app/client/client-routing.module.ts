import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailResolver } from '../_resolvers/product-detail.resolver';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';


const routes: Routes = [
    {
        path: '',
        component: ClientComponent,
        children: [
            {path: '', component: HomeComponent},
            {path: 'register', component: RegisterComponent},
            {path: 'login', component: LoginComponent},
            {path: 'products/:id', component: ProductDetailComponent, resolve: {part: ProductDetailResolver}},
            {path: 'cart', component: CartComponent},
            {path: 'checkout', component: CheckoutComponent}
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
