import { Component, OnInit } from '@angular/core';
import { ProductOrder } from 'src/app/_modelsProductOrder/productOrder';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ProductOrderService } from 'src/app/_services/product-order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['../../admin.component.css']
})
export class OrdersComponent implements OnInit {

  orders: ProductOrder[];
  constructor(
    private alertify: AlertifyService,
    private productorderService: ProductOrderService
  ) { }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.productorderService.getOrders().subscribe((orders: ProductOrder[]) => {
      this.orders = orders;
    }, error => {
      this.alertify.error(error);
    });
  }
}
