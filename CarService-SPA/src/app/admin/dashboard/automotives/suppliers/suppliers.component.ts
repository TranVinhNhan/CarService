import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/app/_models/supplier';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { SupplierService } from 'src/app/_services/supplier.service';

@Component({
  selector: 'app-automotive-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['../../../admin.component.css']
})
export class SuppliersComponent implements OnInit {

  isCollapsed = true;
  suppliers: Supplier[];

  constructor(
    private alertify: AlertifyService,
    private supplierService: SupplierService
  ) { }

  ngOnInit() {
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.supplierService.getSuppliers().subscribe((suppliers: Supplier[]) => {
      this.suppliers = suppliers;
    }, error => {
      this.alertify.error(error);
    });
  }
}
