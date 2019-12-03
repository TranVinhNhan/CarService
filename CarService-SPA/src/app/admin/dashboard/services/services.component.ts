import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/_services/services.service';
import { Service } from 'src/app/_models/service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { Photo } from 'src/app/_models/photo';

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

  openModalWithImageComponent(service: Service) {
    const initialState = {
      title: 'Image Editor',
      service
    };
    this.modalRef = this.modalService.show(ModalServiceImageComponent, { initialState });
  }

  openModalWithDeletePhotoComponent(service: Service, photo: Photo) {
    const initialState = {
      title: 'Delete Photo',
      service,
      photo
    };
    this.modalRef = this.modalService.show(ModalServicePhotoDetailComponent, { initialState });
  }
}
@Component({
  selector: 'app-modal-serivce-image',
  templateUrl: './_template/model-image.html',
  styleUrls: ['./_template/modal-image.css']
})
export class ModalServiceImageComponent implements OnInit {
  title: string;
  service: Service;

  uploader: FileUploader;
  hasBaseDropZoneOver: false;
  baseUrl = environment.apiUrl;

  constructor(
    public modalRef: BsModalRef
  ) { }

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'services/' + this.service.id + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          publicId: res.publicId
        };
        this.service.photo = photo;
      }
    };
  }
}

//#region Modal delete photo component
@Component({
  selector: 'app-modal-service-image-detail',
  templateUrl: './_template/photo-detail.html'
})
export class ModalServicePhotoDetailComponent implements OnInit {
  title: string;
  service: Service;
  photo: Photo;

  baseUrl = environment.apiUrl;

  constructor(
    public modalRef: BsModalRef,
    private servicesService: ServicesService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
  }

  deletePhoto(serviceId: number, id: number) {
    this.servicesService.deletePhoto(serviceId, id).subscribe(() => {
      this.alertify.success('Deleted');
      this.modalRef.hide();
      this.service.photo = null;
    }, error => {
      this.alertify.error(error);
    });
  }
}
//#endregion
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
// #endregion

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
