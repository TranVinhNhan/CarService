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

  part: AutoPart;
  constructor(
    private autopartService: AutopartService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.autopartService.getPart(3).subscribe((part: AutoPart) => {
      this.part = part;
    }, error => {
      this.alertify.error(error);
    });
  }

}
