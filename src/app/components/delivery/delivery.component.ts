import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IOrder } from '../../models/order.model';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  public myOrders: IOrder[];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.http.get<boolean>('http://api.mano/api/sesstat.php')
    .subscribe(data => {
      if (!data) {
        this.router.navigate(['login']);
      }
    });

    this.http.get<IOrder[]>('http://api.mano/api/reso.php')
    .subscribe(data => {
      this.myOrders = data;
    });
  }

  ReturnItem(orderId: number, bookId: number, bookQty: number) {
    this.http.post<boolean>('http://api.mano/api/reso.php', { 'method': 'returnItem', 'orderid': orderId, 'bookid': bookId, 'bookqty':  bookQty })
    .subscribe(data => {
      if (!data) {
        alert("c'è stato un problema con la restituzione dell'oggetto");
      }
    });

    this.http.get<IOrder[]>('http://api.mano/api/reso.php')
    .subscribe(data => {
      this.myOrders = data;
    });
  }

  RemoveOrder(orderId: number) {
    this.http.post<any>('http://api.mano/api/reso.php', { 'method': 'removeOrder', 'orderid': orderId })
    .subscribe(data => {
      if (!data) {
        alert("c'è stato un problema con la rimozione dell'ordine");
      }
    });

    this.http.get<IOrder[]>('http://api.mano/api/reso.php')
    .subscribe(data => {
      this.myOrders = data;
    });
  }
}
