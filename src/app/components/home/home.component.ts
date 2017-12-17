import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IBook } from '../../models/book.model';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../../models/category.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  public books: IBook[];
  public categories: ICategory[];
  public inputCat: ICategory;
  public inputBook: IBook;

  @ViewChild("categoryForm")
  categoryForm: NgForm;

  @ViewChild("cartForm")
  cartForm: NgForm;

  constructor(private http: HttpClient, private router: Router) {
    this.inputCat = {
      CATEGORY_ID: 0,
      CATEGORY_NAME: 'All'
    };

    this.inputBook = {
      AUTHOR: null,
      BOOK_ID: null,
      CATEGORY_NAME: null,
      DESCRIPTION: null,
      ISBN: null,
      PAGES: null,
      PRICE: null,
      PUB_DATE: null,
      QUANTITY: 1,
      TITLE: null
    };
  }

  ngOnInit(): void {
    this.http.get<boolean>('http://api.mano/api/sesstat.php')
    .subscribe(data => {
      console.log(data);
    });

    this.http.get<IBook[]>('http://api.mano/api/elenco.php')
    .subscribe(data => {
      this.books = data;
    });

    this.http.get<ICategory[]>('http://api.mano/api/categorie.php')
    .subscribe(data => {
      this.categories = data;
    });
  }

  SearchTitle() {
    this.http.get<IBook[]>(`http://api.mano/api/elenco.php?title=${this.inputBook.TITLE}`)
    .subscribe(data => {
      this.books = data;
    });
  }

  CategoryFilter() {
    this.http.get<IBook[]>(`http://api.mano/api/elenco.php?category=${this.inputCat.CATEGORY_ID}`)
    .subscribe(data => {
      this.books = data;
    });
  }

  AddToCart(id: number, qty: number) {
    this.http.post<boolean>('http://api.mano/api/carrello.php', { 'method': 'add', 'bookid': id, 'bookqty': qty })
    .subscribe(data=> {
      if (data) {
        this.router.navigate(['cart']);
      } else {
        alert("C'è stato un errore nell'aggiunta dell'articolo");
      }
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
