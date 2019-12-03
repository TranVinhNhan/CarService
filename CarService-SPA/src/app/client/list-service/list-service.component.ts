import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/_models/service';
import { ServicesService } from 'src/app/_services/services.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.css']
})
export class ListServiceComponent implements OnInit {

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
    });
  }
}
