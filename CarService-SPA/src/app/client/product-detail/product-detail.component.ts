import { Component, OnInit } from '@angular/core';
import { AutopartService } from 'src/app/_services/autopart.service';
import { ActivatedRoute } from '@angular/router';
import { AutoPart } from 'src/app/_models/autopart';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['../client.component.css']
})
export class ProductDetailComponent implements OnInit {

  part: AutoPart;
  constructor(
    private autopartService: AutopartService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.part = data.part;
    });
  }
}
