import { Component, OnInit } from '@angular/core';
import { AutoType } from 'src/app/_models/autotype';
import { AutotypeService } from 'src/app/_services/autotype.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Supplier } from 'src/app/_models/supplier';
import { SupplierService } from 'src/app/_services/supplier.service';
import { AutopartService } from 'src/app/_services/autopart.service';
import { AutoPart } from 'src/app/_models/autopart';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { Photo } from 'src/app/_models/photo';
import { AutoPartForUpdateDto } from 'src/app/_dtos/AutoPartForUpdateDto';

@Component({
  selector: 'app-automotives',
  templateUrl: './automotives.component.html',
  styleUrls: ['../../admin.component.css']
})
export class AutomotivesComponent implements OnInit {

  isCollapsed = true;
  modalRef: BsModalRef;
  types: AutoType[];
  suppliers: Supplier[];
  parts: AutoPart[];

  constructor(
    private autotypeService: AutotypeService,
    private alertify: AlertifyService,
    private supplierService: SupplierService,
    private autopartService: AutopartService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.loadTypes();
    this.loadSuppliers();
    this.loadParts();
  }

  loadTypes() {
    this.autotypeService.getTypes().subscribe((types: AutoType[]) => {
      this.types = types;
    }, error => {
      this.alertify.error(error);
    });
  }

  loadSuppliers() {
    this.supplierService.getSuppliers().subscribe((suppliers: Supplier[]) => {
      this.suppliers = suppliers;
    }, error => {
      this.alertify.error(error);
    });
  }

  loadParts() {
    this.autopartService.getParts().subscribe((parts: AutoPart[]) => {
      this.parts = parts;
    }, error => {
      this.alertify.error(error);
    });
  }

  openModalWithDeleteComponent(part: AutoPart) {
    const initialState = {
      title: 'Confirm Delete',
      part,
      parts: this.parts
    };
    this.modalRef = this.modalService.show(ModalPartDeleteComponent, { initialState });
  }

  openModalWithImageComponent(part: AutoPart) {
    const initialState = {
      title: 'Image Editor',
      part
    };
    this.modalRef = this.modalService.show(ModalPartImageComponent, { initialState });
  }

  openModalWithDetailComponent(part: AutoPart) {
    const initialState = {
      title: 'Product Detail',
      part,
      parts: this.parts,
      suppliers: this.suppliers,
      types: this.types
    };
    this.modalRef = this.modalService.show(ModalPartDetailComponent, { initialState });
  }

  openModalWithDeletePhotoComponent(part: AutoPart, photo: Photo) {
    const initialState = {
      title: 'Delete Photo',
      part,
      photo
    };
    this.modalRef = this.modalService.show(ModalPhotoDetailComponent, { initialState });
  }
}

//#region Modal delete component
@Component({
  selector: 'app-modal-part-delete',
  templateUrl: './_template/modal-delete.html'
})
export class ModalPartDeleteComponent implements OnInit {
  title: string;
  part: AutoPart;
  parts: AutoPart[];

  constructor(
    public modalRef: BsModalRef,
    private autopartService: AutopartService,
    private alertify: AlertifyService
    // private router: Router
  ) { }

  ngOnInit() { }

  deletePart(id: number) {
    this.autopartService.deletePart(id).subscribe(next => {
      this.alertify.success('Delete completed');
      this.modalRef.hide();
      const index = this.parts.indexOf(this.part, 0);
      if (index > -1) {
        this.parts.splice(index, 1);
      }
      // this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
      //   this.router.navigate(['/admin/autoparts']);
      // });
    }, error => {
      this.alertify.error(error);
    });
  }
}
//#endregion

//#region Modal image component
@Component({
  selector: 'app-modal-part-image',
  templateUrl: './_template/modal-image.html',
  styleUrls: ['./_template/modal-image.css']
})
export class ModalPartImageComponent implements OnInit {
  title: string;
  part: AutoPart;

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
      url: this.baseUrl + 'automotives/' + this.part.id + '/photos',
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
        this.part.photos.push(photo);
      }
    };
  }
}
//#endregion

//#region Modal detail component
@Component({
  selector: 'app-modal-part-detail',
  templateUrl: './_template/modal-detail.html'
})
export class ModalPartDetailComponent implements OnInit {
  title: string;
  part: AutoPart;
  parts: AutoPart[];
  suppliers: Supplier[];
  types: AutoType[];
  updatePart: AutoPartForUpdateDto = {
    name: '',
    description: '',
    currentPrice: 0,
    supplierId: 0,
    automotivePartTypeId: 0
  };
  displayPart: AutoPart;

  baseUrl = environment.apiUrl;

  constructor(
    public modalRef: BsModalRef,
    private autopartService: AutopartService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.displayPart = Object.assign({}, this.part);
  }

  saveChanges() {
    this.updatePart.name = this.part.name;
    this.updatePart.description = this.part.description;
    this.updatePart.currentPrice = this.part.currentPrice;
    this.updatePart.supplierId = this.part.supplier.id;
    this.updatePart.automotivePartTypeId = this.part.automotivePartType.id;

    // console.log(this.updatePart);
    this.autopartService.updatePart(this.part.id, this.updatePart).subscribe(next => {
      this.alertify.success('Updated successfully');
      this.modalRef.hide();
    }, error => {
      this.alertify.error(error);
    });
  }
}
//#endregion

//#region Modal delete photo component
@Component({
  selector: 'app-modal-image-detail',
  templateUrl: './_template/photo-detail.html'
})
export class ModalPhotoDetailComponent implements OnInit {
  title: string;
  part: AutoPart;
  photo: Photo;

  baseUrl = environment.apiUrl;

  constructor(
    public modalRef: BsModalRef,
    private autopartService: AutopartService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
  }

  deletePhoto(partId: number, id: number) {
    this.autopartService.deletePhoto(partId, id).subscribe(() => {
      this.alertify.success('Deleted');
      this.modalRef.hide();
      const index = this.part.photos.indexOf(this.photo, 0);
      if (index > -1) {
        this.part.photos.splice(index, 1);
      }
    }, error => {
      this.alertify.error(error);
    });
  }
}
//#endregion

