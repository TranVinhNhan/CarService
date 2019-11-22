import { Component, OnInit } from '@angular/core';
import { AutoType } from 'src/app/_models/autotype';
import { AutotypeService } from 'src/app/_services/autotype.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Type } from '@angular/compiler';

@Component({
  selector: 'app-automotive-types',
  templateUrl: './types.component.html',
  styleUrls: ['../../../admin.component.css']
})
export class TypesComponent implements OnInit {

  isCollapsed = true;
  types: AutoType[];
  modalRef: BsModalRef;

  constructor(
    private autotypeService: AutotypeService,
    private alertify: AlertifyService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.loadTypes();
  }

  loadTypes() {
    this.autotypeService.getTypes().subscribe((types: AutoType[]) => {
      this.types = types;
    }, error => {
      this.alertify.error(error);
    });
  }

  openModalWithDeleteComponent(type: Type) {
    const initialState = {
      title: 'Confirm Delete',
      type,
      types: this.types
    };
    this.modalRef = this.modalService.show(ModalTypeDeleteComponent, { initialState });
  }

  openModalWithDetailComponent(type: Type) {
    const initialState = {
      title: 'Detail',
      type,
      types: this.types
    };
    this.modalRef = this.modalService.show(ModalTypeDetailComponent, { initialState });
  }
}

//#region Modal Type Delete Component
@Component({
  selector: 'app-modal-type-delete',
  templateUrl: './_template/modal-delete.html'
})
export class ModalTypeDeleteComponent implements OnInit {
  title: string;
  type: AutoType;
  types: AutoType[];

  constructor(
    private autotypeService: AutotypeService,
    private alertify: AlertifyService,
    public modalRef: BsModalRef
  ) { }

  ngOnInit() { }

  deleteType(id: number) {
    this.autotypeService.deleteType(id).subscribe(next => {
      this.alertify.success('Delete Completed');
      this.modalRef.hide();
      const index = this.types.indexOf(this.type, 0);
      if (index > -1) {
        this.types.splice(index, 1);
      }
    }, error => {
      this.alertify.error(error);
    });
  }
}
//#endregion

@Component({
  selector: 'app-modal-type-detail',
  templateUrl: './_template/modal-detail.html'
})
export class ModalTypeDetailComponent implements OnInit {
  title: string;
  type: AutoType;
  types: AutoType[];
  model: any = {};

  constructor(
    private autotypeService: AutotypeService,
    private alertify: AlertifyService,
    public modalRef: BsModalRef
  ) { }

  ngOnInit() {
    this.model = Object.assign({}, this.type);
   }

  saveChanges() {
    this.autotypeService.updateType(this.type.id, this.model).subscribe(next => {
      this.alertify.success('Update Successfully');
      this.modalRef.hide();
      const index = this.types.indexOf(this.type, 0);
      if (index > -1) {
        this.type = Object.assign({}, this.model);
        this.types[index] = this.type;
      }
    }, error => {
      this.alertify.error(error);
    });
  }
}
