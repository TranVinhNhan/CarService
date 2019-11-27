import { Component, OnInit } from '@angular/core';
import { ProductOrder } from 'src/app/_modelsProductOrder/productOrder';
import { ProductOrderService } from 'src/app/_services/product-order.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['../client.component.css']
})
export class MyOrdersComponent implements OnInit {

  myOrders: ProductOrder[];
  constructor(
    private productorderService: ProductOrderService,
    private alertify: AlertifyService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    const decodedToken = this.authService.decodedToken;
    if (decodedToken) {
      this.productorderService.getOrdersByUser(decodedToken.nameid).subscribe((myOrders: ProductOrder[]) => {
        this.myOrders = myOrders;
      }, error => {
        this.alertify.error(error);
      });
    } else {
      this.alertify.error('Error');
    }
  }

  cancelOrderFromUser(order: ProductOrder) {
    this.productorderService.cancelOrderFromUser(this.authService.decodedToken.nameid, order.id).subscribe(next => {
      this.alertify.success('Order cancelled');
      const index = this.myOrders.indexOf(order, 0);
      if (index > -1) {
        this.myOrders[index].status = 'Cancelled';
      }
    }, error => {
      this.alertify.error(error);
    });
  }
}
