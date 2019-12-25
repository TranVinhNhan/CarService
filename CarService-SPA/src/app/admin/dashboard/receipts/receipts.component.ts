import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { CarReceiptService } from 'src/app/_services/car-receipt.service';
import { Receipt } from 'src/app/_models/receipt';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['../../admin.component.css']
})
export class ReceiptsComponent implements OnInit {

  receipts: Receipt[];

  constructor(
    private alertify: AlertifyService,
    private carReceiptService: CarReceiptService
  ) { }

  ngOnInit() {
    this.loadReceipts();
  }

  loadReceipts() {
    this.carReceiptService.getCarReceipts().subscribe((receipts: Receipt[]) => {
      this.receipts = receipts;
    }, error => {
      this.alertify.error(error);
    });
  }
}
