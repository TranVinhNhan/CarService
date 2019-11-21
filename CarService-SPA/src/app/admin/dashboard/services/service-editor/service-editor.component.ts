import { Component, OnInit, Input } from '@angular/core';
import { ServicesService } from 'src/app/_services/services.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Service } from 'src/app/_models/service';

@Component({
  selector: 'app-service-editor',
  templateUrl: './service-editor.component.html',
  styleUrls: ['./service-editor.component.css']
})
export class ServiceEditorComponent implements OnInit {

  model: any = {};
  @Input() services: Service[];

  constructor(
    private servicesService: ServicesService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
  }

  addService() {
    this.servicesService.addService(this.model).subscribe((response: any) => {
      this.alertify.success('Service Added');
      this.services.push(response);
    }, error => {
      this.alertify.error(error);
    });
  }
}
