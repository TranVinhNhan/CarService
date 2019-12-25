import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/_services/services.service';
import { Service } from 'src/app/_models/service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { CarReceiptService } from 'src/app/_services/car-receipt.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.css']
})
export class RepairComponent implements OnInit {

  services: Service[];
  model: any = {};
  requestServiceForm: FormGroup;
  user: User;
  constructor(
    private servicesService: ServicesService,
    private carReceiptService: CarReceiptService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private userService: UserService
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
    if (this.authService.loggedIn()) {
      this.userService.userGetUser(this.authService.decodedToken.nameid).subscribe((user: User) => {
        this.user = user;
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.requestServiceForm.setValue({
          firstname: this.user.firstName,
          lastname: this.user.lastName,
          licensePlateNumber: null,
          brand: null,
          carModel: null,
          email: this.user.email,
          phoneNumber: null,
          address: this.user.address,
          serviceId: null
        });
        this.requestServiceForm.markAllAsTouched();
      });
    }
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
      // console.log(this.model.userId);
      this.carReceiptService.addCarReceipt(this.model).subscribe(next => {
        this.alertify.success('Your request has been sent');
      }, error => {
        this.alertify.error(error);
      });
    }
  }
}
