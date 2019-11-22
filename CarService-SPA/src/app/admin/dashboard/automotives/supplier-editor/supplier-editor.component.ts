import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { SupplierService } from 'src/app/_services/supplier.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Supplier } from 'src/app/_models/supplier';

@Component({
  selector: 'app-supplier-editor',
  templateUrl: './supplier-editor.component.html',
  styleUrls: ['./supplier-editor.component.css']
})
export class SupplierEditorComponent implements OnInit {

  model: any = {};
  @Input() suppliers: Supplier[];
  @ViewChild('resetBtn', { static: false }) resetBtn: ElementRef<HTMLElement>;

  constructor(
    private supplierService: SupplierService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
  }

  addSupplier() {
    this.supplierService.addSupplier(this.model).subscribe((response: any) => {
      this.alertify.success('Item Added');
      this.suppliers.push(response);
      const reset: HTMLElement = this.resetBtn.nativeElement;
      reset.click();
    }, error => {
      this.alertify.error(error);
    });
  }
}
