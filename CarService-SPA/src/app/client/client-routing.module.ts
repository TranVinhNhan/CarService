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
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { RepairComponent } from './repair/repair.component';
import { ListServiceComponent } from './list-service/list-service.component';
import { MyServicesComponent } from './my-services/my-services.component';
import { MyPurchasesComponent } from './my-purchases/my-purchases.component';
import { ProfileComponent } from './profile/profile.component';


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
            {path: 'checkout', component: CheckoutComponent},
            {path: 'purchases', component: MyPurchasesComponent},
            {path: 'services', component: ListServiceComponent},
            {path: 'request', component: RepairComponent},
            {path: 'profile', component: ProfileComponent}
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
