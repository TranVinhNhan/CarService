import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './home/register/register.component';
import { LoginComponent } from './home/login/login.component';


const routes: Routes = [
    {
        path: '',
        component: ClientComponent,
        children: [
            {path: '', component: HomeComponent},
            {path: 'register', component: RegisterComponent},
            {path: 'login', component: LoginComponent}
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
