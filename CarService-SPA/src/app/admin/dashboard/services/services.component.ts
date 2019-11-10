import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/_services/services.service';
import { Service } from 'src/app/_models/service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['../../admin.component.css']
})
export class ServicesComponent implements OnInit {

  services: Service[];
  constructor(
    private servicesService: ServicesService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.servicesService.getServices().subscribe((services: Service[]) => {
      this.services = services;
    }, error => {
      this.alertify.error(error);
    })
  }
}
