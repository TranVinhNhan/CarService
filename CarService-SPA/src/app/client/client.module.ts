import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

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

@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ClientComponent,
    NavComponent,
    HomeComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    ProductDetailComponent,
    CartComponent
  ],
  providers: [
    AutopartService,
    ProductDetailResolver,
    ShoppingCartService
  ]
})
export class ClientModule { }
