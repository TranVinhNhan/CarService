import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule, PopoverModule, ModalModule, CollapseModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { UsersComponent, ModalUserDeleteComponent, ModalUserDetailComponent } from './dashboard/users/users.component';
import { UserService } from '../_services/user.service';
import {
  AutomotivesComponent,
  ModalPartDeleteComponent,
  ModalPartImageComponent,
  ModalPartDetailComponent,
  ModalPhotoDetailComponent
} from './dashboard/automotives/automotives.component';
import { AutotypeService } from '../_services/autotype.service';
import { SupplierService } from '../_services/supplier.service';
import { AutopartService } from '../_services/autopart.service';
import { ServicesComponent, ModalServiceDeleteComponent, ModalServiceDetailComponent } from './dashboard/services/services.component';
import { ServicesService } from '../_services/services.service';
import { AutomotiveEditorComponent } from './dashboard/automotives/automotive-editor/automotive-editor.component';
import { TypesComponent, ModalTypeDeleteComponent, ModalTypeDetailComponent } from './dashboard/automotives/types/types.component';
import {
  SuppliersComponent,
  ModalSupplierDeleteComponent,
  ModalSupplierDetailComponent
} from './dashboard/automotives/suppliers/suppliers.component';
import { ServiceEditorComponent } from './dashboard/services/service-editor/service-editor.component';
import { TypeEditorComponent } from './dashboard/automotives/type-editor/type-editor.component';
import { SupplierEditorComponent } from './dashboard/automotives/supplier-editor/supplier-editor.component';
import { OrdersComponent } from './dashboard/orders/orders.component';
import { ProductOrderService } from '../_services/product-order.service';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ChartsModule,
    FormsModule,
    FileUploadModule,
    BsDropdownModule.forRoot(),
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot()
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    UsersComponent,
    AutomotivesComponent,
    AutomotiveEditorComponent,
    ServicesComponent,
    ServiceEditorComponent,
    TypesComponent,
    TypeEditorComponent,
    SuppliersComponent,
    SupplierEditorComponent,
    OrdersComponent,

    ModalUserDeleteComponent,
    ModalUserDetailComponent,
    ModalPartDeleteComponent,
    ModalPartImageComponent,
    ModalPartDetailComponent,
    ModalPhotoDetailComponent,
    ModalServiceDeleteComponent,
    ModalServiceDetailComponent,
    ModalTypeDeleteComponent,
    ModalTypeDetailComponent,
    ModalSupplierDeleteComponent,
    ModalSupplierDetailComponent
  ],
  providers: [
    UserService,
    AutotypeService,
    SupplierService,
    AutopartService,
    ServicesService,
    ProductOrderService
  ],
  entryComponents: [
    ModalUserDeleteComponent,
    ModalUserDetailComponent,
    ModalPartDeleteComponent,
    ModalPartImageComponent,
    ModalPartDetailComponent,
    ModalPhotoDetailComponent,
    ModalServiceDeleteComponent,
    ModalServiceDetailComponent,
    ModalTypeDeleteComponent,
    ModalTypeDetailComponent,
    ModalSupplierDeleteComponent,
    ModalSupplierDetailComponent
  ]
})
export class AdminModule { }
