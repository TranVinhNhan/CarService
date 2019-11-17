import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './dashboard/users/users.component';
import { AutomotivesComponent } from './dashboard/automotives/automotives.component';
import { ServicesComponent } from './dashboard/services/services.component';


const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {path: '', component: DashboardComponent},
            {path: 'users', component: UsersComponent},
            {path: 'autoparts', component: AutomotivesComponent},
            {path: 'services', component: ServicesComponent},
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
