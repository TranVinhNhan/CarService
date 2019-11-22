import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/app/_models/supplier';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { SupplierService } from 'src/app/_services/supplier.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-automotive-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['../../../admin.component.css']
})
export class SuppliersComponent implements OnInit {

  isCollapsed = true;
  suppliers: Supplier[];
  modalRef: BsModalRef;

  constructor(
    private alertify: AlertifyService,
    private supplierService: SupplierService,
    private modalService: BsModalService
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

  openModalWithDeleteComponent(supplier: Supplier) {
    const initialState = {
      title: 'Confirm Delete',
      supplier,
      suppliers: this.suppliers
    };
    this.modalRef = this.modalService.show(ModalSupplierDeleteComponent, { initialState });
  }

  openModalWithDetailComponent(supplier: Supplier) {
    const initialState = {
      title: 'Detail',
      supplier,
      suppliers: this.suppliers
    };
    this.modalRef = this.modalService.show(ModalSupplierDetailComponent, { initialState });
  }
}

@Component({
  selector: 'app-modal-supplier-delete',
  templateUrl: './_template/modal-delete.html'
})
export class ModalSupplierDeleteComponent implements OnInit {
  title: string;
  supplier: Supplier;
  suppliers: Supplier[];

  constructor(
    private supplierService: SupplierService,
    private alertify: AlertifyService,
    public modalRef: BsModalRef
  ) { }

  ngOnInit() { }

  deleteSupplier(id: number) {
    this.supplierService.deleteService(id).subscribe(next => {
      this.alertify.success('Delete Completed');
      this.modalRef.hide();
      const index = this.suppliers.indexOf(this.supplier, 0);
      if (index > -1) {
        this.suppliers.splice(index, 1);
      }
    }, error => {
      this.alertify.error(error);
    });
  }
}

@Component({
  selector: 'app-modal-supplier-detail',
  templateUrl: './_template/modal-detail.html'
})
export class ModalSupplierDetailComponent implements OnInit {
  title: string;
  supplier: Supplier;
  suppliers: Supplier[];
  model: any = {};

  constructor(
    private supplierService: SupplierService,
    private alertify: AlertifyService,
    public modalRef: BsModalRef
  ) { }

  ngOnInit() {
    this.model = Object.assign({}, this.supplier);
  }

  saveChanges() {
    this.supplierService.updateSupplier(this.supplier.id, this.model).subscribe(next => {
      this.alertify.success('Update Successfully');
      this.modalRef.hide();
      const index = this.suppliers.indexOf(this.supplier, 0);
      if (index > -1) {
        this.supplier = Object.assign({}, this.model);
        this.suppliers[index] = this.supplier;
      }
    }, error => {
      this.alertify.error(error);
    });
  }
}
