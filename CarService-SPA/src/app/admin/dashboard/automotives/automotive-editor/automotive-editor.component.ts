import { Component, OnInit } from '@angular/core';
import { AutotypeService } from 'src/app/_services/autotype.service';
import { SupplierService } from 'src/app/_services/supplier.service';
import { AutoType } from 'src/app/_models/autotype';
import { Supplier } from 'src/app/_models/supplier';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AutopartService } from 'src/app/_services/autopart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-automotive-editor',
  templateUrl: './automotive-editor.component.html',
  styleUrls: ['./automotive-editor.component.css']
  // styleUrls: ['../../../admin.component.css']
})
export class AutomotiveEditorComponent implements OnInit {
  types: AutoType[];
  suppliers: Supplier[];
  model: any = {};



  constructor(
    private alertify: AlertifyService,
    private autotypeService: AutotypeService,
    private supplierService: SupplierService,
    private autopartService: AutopartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.autotypeService.getTypes().subscribe((types: AutoType[]) => {
      this.types = types;
    }, error => {
      this.alertify.error(error);
    });

    this.supplierService.getSuppliers().subscribe((suppliers: Supplier[]) => {
      this.suppliers = suppliers;
    }, error => {
      this.alertify.error(error);
    });
  }

  addItem() {
    this.autopartService.addPart(this.model).subscribe(() => {
      this.alertify.success('Item Added');
      this.router.navigateByUrl('/admin/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/admin/autoparts']);
      });
    }, error => {
      this.alertify.error(error);
    });
  }
}
