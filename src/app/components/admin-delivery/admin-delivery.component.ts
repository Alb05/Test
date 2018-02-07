import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IAdOrder } from '../../models/adorder.model';

@Component({
  selector: 'app-admin-delivery',
  templateUrl: './admin-delivery.component.html',
  styleUrls: ['./admin-delivery.component.css']
})
export class AdminDeliveryComponent implements OnInit {

  public retOrders: IAdOrder[];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.http.get<boolean>('http://api.mano/api/sesstat.php')
    .subscribe(data => {
      if (!data) {
        this.router.navigate(['login']);
      }
    });

    this.http.get<boolean>('http://api.mano/api/adstat.php')
    .subscribe(data => {
      if (!data) {
        this.router.navigate(['delivery']);
        alert("Non hai i permessi da amministratore");
      }
    });

    this.http.get<IAdOrder[]>('http://api.mano/api/adreso.php')
    .subscribe(data => {
      this.retOrders = data;
    });
  }

  Recieved(orderId, bookId) {
    this.http.post<boolean>('http://api.mano/api/adreso.php', { 'method': 'recieved', 'orderid': orderId, 'bookid': bookId })
    .subscribe(data => {
      if (!data) {
        alert("c'è stato un problema con la modifica dello stato");
      }
    });

    this.http.get<IAdOrder[]>('http://api.mano/api/adreso.php')
    .subscribe(data => {
      this.retOrders = data;
    });
  }

  Completed(orderId, bookId) {
    this.http.post<boolean>('http://api.mano/api/adreso.php', { 'method': 'completed', 'orderid': orderId, 'bookid': bookId })
    .subscribe(data => {
      if (!data) {
        alert("c'è stato un problema con la modifica dello stato");
      }
    });

    this.http.get<IAdOrder[]>('http://api.mano/api/adreso.php')
    .subscribe(data => {
      this.retOrders = data;
    });
  }

  Logout() {
    this.http.get<boolean>('http://api.mano/api/logout.php').subscribe(data=> {
      if (data) {
        this.router.navigate(['login']);
      } else {
        alert("C'è stato un errore nel logout");
      }
    });
  }
}
