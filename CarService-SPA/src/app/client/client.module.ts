import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client-routing.module';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './home/register/register.component';
import { LoginComponent } from './home/login/login.component';

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
    LoginComponent
  ],
  providers: []
})
export class ClientModule { }
