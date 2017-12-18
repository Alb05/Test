import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICart } from '../../models/cart.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public myBooks: ICart[];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.http.get<boolean>('http://api.mano/api/sesstat.php')
    .subscribe(data => {
      if (!data) {
        this.router.navigate(['login']);
      }
    });

    this.http.get<ICart[]>('http://api.mano/api/carrello.php')
    .subscribe(data => {
      this.myBooks = data;
    });
  }

  ModifyQty(id: number, qty: number) {
    this.http.post<boolean>('http://api.mano/api/carrello.php', { 'method': 'modify', 'bookid': id, 'bookqty': qty })
    .subscribe(data => {
      if (!data) {
        alert("La modifica non è possibile");
      }
    });

    this.http.get<ICart[]>('http://api.mano/api/carrello.php')
    .subscribe(data => {
      this.myBooks = data;
    });
  }

  RemoveItem(id: number) {
    this.http.post<boolean>('http://api.mano/api/carrello.php', { 'method': 'remove', 'bookid': id })
    .subscribe(data => {
      if (!data) {
        alert("c'è stato un problema con la rimozione dell'oggetto");
      }
    });

    this.http.get<ICart[]>('http://api.mano/api/carrello.php')
    .subscribe(data => {
      this.myBooks = data;
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

  Order() {
    this.http.get<boolean>('http://api.mano/api/ordina.php')
    .subscribe(data => {
      if (data) {
        alert('Ordine effettuato con successo!');
        this.router.navigate(['home']);
      } else {
        alert("C'e stato un problema con l'esecuzione dell'ordine");
      }
    });
  }
}
