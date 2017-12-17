import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICart } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public myBooks: ICart[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<ICart[]>('http://api.mano/api/carrello.php')
    .subscribe(data => {
      this.myBooks = data;
    });
  }

  ModifyQty(id: number, qty: number) {
    this.http.post<boolean>('http://api.mano/api/carrello.php', { 'method': 'modify', 'bookid': id, 'bookqty': qty })
    .subscribe(data => {
      console.log(data);
    });

    this.http.get<ICart[]>('http://api.mano/api/carrello.php')
    .subscribe(data => {
      this.myBooks = data;
    });
  }

  RemoveItem(id: number) {
    this.http.post<boolean>('http://api.mano/api/carrello.php', { 'method': 'remove', 'bookid': id })
    .subscribe(data => {
      console.log(data);
    });

    this.http.get<ICart[]>('http://api.mano/api/carrello.php')
    .subscribe(data => {
      this.myBooks = data;
    });
  }

  Logout() {
    this.http.get<boolean>('http://api.mano/api/logout.php').subscribe(data=> {
      console.log(data);
    });
  }

  Order() {
    this.http.get<boolean>('http://api.mano/api/ordina.php')
    .subscribe(data => {
      console.log(data);
    });
  }
}
