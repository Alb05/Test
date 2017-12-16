import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBook } from '../../models/book.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public myBooks: IBook[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    /*
    this.http.get<IBook[]>('http://api.mano/api/carrello.php')
    .subscribe(data => {
      this.myBooks = data;
    });
    */
  }

  RemoveItem(id: number, qty: number) {
    this.http.post<boolean>('http://api.mano/api/rimuovi.php', { 'bookid': id, 'bookqty': qty })
    .subscribe(data => {
      console.log(data);
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
