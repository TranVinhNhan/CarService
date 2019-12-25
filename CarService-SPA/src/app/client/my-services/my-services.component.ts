import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { CarReceiptService } from 'src/app/_services/car-receipt.service';
import { CarReceiptDetail } from 'src/app/_models/carReceiptDetail';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Service } from 'src/app/_models/service';
import { ServicesService } from 'src/app/_services/services.service';

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['../client.component.css']
})
export class MyServicesComponent implements OnInit {

  carReceipts: CarReceiptDetail[];
  services: Service[];

  constructor(
    private authService: AuthService,
    private carReceiptService: CarReceiptService,
    private servicesService: ServicesService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.loadCarReceipts();
  }

  loadCarReceipts() {
    const decodedToken = this.authService.decodedToken;
    if (decodedToken) {
      this.servicesService.getServices().subscribe((services: Service[]) => {
        this.services = services;
      }, error => {
        this.alertify.error(error);
      });

      this.carReceiptService.getCarReceiptsByUser(decodedToken.nameid)
        .subscribe((carReceipts: CarReceiptDetail[]) => {
          this.carReceipts = carReceipts.sort((a, b) => new Date(b.dayReceived).getTime() - new Date(a.dayReceived).getTime());
        }, error => {
          this.alertify.error(error);
        }, () => {
          this.carReceipts.forEach(item => {
            item.serviceName = this.services.filter(x => x.id === item.serviceId)[0].name;
          });
        });
    } else {
      this.alertify.error('Error');
    }

  }
}
