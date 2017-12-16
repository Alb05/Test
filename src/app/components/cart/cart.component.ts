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
    this.http.get<IBook[]>('http://api.mano/api/carrello.php')
    .subscribe(data => {
      this.myBooks = data;
    });
  }

}
