import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/_services/services.service';
import { Service } from 'src/app/_models/service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['../../admin.component.css']
})
export class ServicesComponent implements OnInit {

  isCollapsed = true;
  services: Service[];
  modalRef: BsModalRef;
  constructor(
    private servicesService: ServicesService,
    private alertify: AlertifyService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.servicesService.getServices().subscribe((services: Service[]) => {
      this.services = services;
    }, error => {
      this.alertify.error(error);
    });
  }


  openModalWithDetailComponent(service: Service) {
    const initialState = {
      title: 'Service Detail',
      service,
      services: this.services
    };
    this.modalRef = this.modalService.show(ModalServiceDetailComponent, { initialState });
  }

  openModalWithDeleteComponent(service: Service) {
    const initialState = {
      title: 'Confirm Delete',
      service,
      services: this.services
    };
    this.modalRef = this.modalService.show(ModalServiceDeleteComponent, { initialState });
  }
}

//#region Modal detail component
@Component({
  selector: 'app-modal-service-detail',
  templateUrl: './_template/modal-detail.html'
})
export class ModalServiceDetailComponent implements OnInit {
  title: string;
  service: Service;
  services: Service[];
  model: any = {};

  constructor(
    public modalRef: BsModalRef,
    private servicesService: ServicesService,
    private alertify: AlertifyService
  ) {
  }

  ngOnInit() {
    this.model = Object.assign({}, this.service);
  }

  saveChanges() {
    this.servicesService.updateService(this.service.id, this.model).subscribe(next => {
      this.alertify.success('Update successfully');
      this.modalRef.hide();
      const index = this.services.indexOf(this.service, 0);
      if (index > -1) {
        this.service = Object.assign({}, this.model);
        this.services[index] = this.service;
      }
    }, error => {
      this.alertify.error(error);
    });
  }
}

//#region Modal delete component
@Component({
  selector: 'app-modal-service-delete',
  templateUrl: './_template/modal-delete.html'
})
export class ModalServiceDeleteComponent implements OnInit {
  title: string;
  service: Service;
  services: Service[];

  constructor(
    public modalRef: BsModalRef,
    private servicesService: ServicesService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() { }

  deleteService(id: number) {
    this.servicesService.deleteService(id).subscribe(next => {
      this.alertify.success('Deleted');
      this.modalRef.hide();
      const index = this.services.indexOf(this.service, 0);
      if (index > -1) {
        this.services.splice(index, 1);
      }
    }, error => {
      this.alertify.error(error);
    });
  }
}
//#endregion
