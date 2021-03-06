import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../_filters/filter.pipe';

import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client-routing.module';
import { NavComponent } from './_nav/nav.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './_footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AutopartService } from '../_services/autopart.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailResolver } from '../_resolvers/product-detail.resolver';
import { CartComponent } from './cart/cart.component';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductOrderService } from '../_services/product-order.service';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { RepairComponent } from './repair/repair.component';
import { ListServiceComponent } from './list-service/list-service.component';
import { CarouselModule, TabsModule } from 'ngx-bootstrap';
import { CarReceiptService } from '../_services/car-receipt.service';
import { MyServicesComponent } from './my-services/my-services.component';
import { MyPurchasesComponent } from './my-purchases/my-purchases.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    TabsModule.forRoot()
  ],
  declarations: [
    ClientComponent,
    NavComponent,
    HomeComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    ProductDetailComponent,
    CartComponent,
    CheckoutComponent,
    MyOrdersComponent,
    MyServicesComponent,
    MyPurchasesComponent,
    RepairComponent,
    ListServiceComponent,
    ProfileComponent,
    FilterPipe
  ],
  providers: [
    AutopartService,
    ShoppingCartService,
    ProductOrderService,
    CarReceiptService,

    ProductDetailResolver
  ]
})
export class ClientModule { }
