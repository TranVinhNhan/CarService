import { Component, OnInit } from '@angular/core';
import { AutopartService } from 'src/app/_services/autopart.service';
import { AutoPart } from 'src/app/_models/autopart';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../client.component.css']
})
export class HomeComponent implements OnInit {

  parts: AutoPart[];
  constructor(
    private autopartService: AutopartService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.autopartService.getParts().subscribe((parts: AutoPart[]) => {
      this.parts = parts;
    }, error => {
      this.alertify.error(error);
    });
  }

}
