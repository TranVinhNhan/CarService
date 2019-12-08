import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/_services/services.service';
import { Service } from 'src/app/_models/service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { CarReceiptService } from 'src/app/_services/car-receipt.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.css']
})
export class RepairComponent implements OnInit {

  services: Service[];
  model: any = {};
  requestServiceForm: FormGroup;
  constructor(
    private servicesService: ServicesService,
    private carReceiptService: CarReceiptService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loadServices();
    this.createRequestServiceForm();
  }

  loadServices() {
    this.servicesService.getServices().subscribe((services: Service[]) => {
      this.services = services;
    }, error => {
      this.alertify.error(error);
    });
  }

  createRequestServiceForm() {
    this.requestServiceForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      licensePlateNumber: ['', Validators.required],
      brand: ['', Validators.required],
      carModel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      serviceId: ['', Validators.required]
    });
  }

  requestService() {
    if (this.requestServiceForm.valid) {
      this.model = Object.assign({}, this.requestServiceForm.value);
      localStorage.getItem('token') ? this.model.userId = +this.authService.decodedToken.nameid : this.model.userId = 2;
      console.log(this.model.userId);
      this.carReceiptService.addCarReceipt(this.model).subscribe(next => {
        this.alertify.success('Your request has been sent');
      }, error => {
        this.alertify.error(error);
      });
    }
  }
}
