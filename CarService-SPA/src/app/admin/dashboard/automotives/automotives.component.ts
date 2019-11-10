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
      suppliers: this.suppliers,
      types: this.types
    };
    this.modalRef = this.modalService.show(ModalPartDetailComponent, { initialState });
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
    private alertify: AlertifyService,
    private router: Router
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
    public modalRef: BsModalRef,
    private autopartService: AutopartService,
    private alertify: AlertifyService,
    private router: Router
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
      if (response)
      {
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
  suppliers: Supplier[];
  types: AutoType[];

  baseUrl = environment.apiUrl;

  constructor(
    public modalRef: BsModalRef,
    private autopartService: AutopartService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  saveChanges(id: number) {
    console.log('changes saved');
    this.modalRef.hide();
  }
}
//#endregion

