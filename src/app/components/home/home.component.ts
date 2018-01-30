import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IBook } from '../../models/book.model';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../../models/category.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IPage } from '../../models/page.model';

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
  public currentPageNr: number;
  public pages: number;
  public page: IBook[];

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
      if (!data) {
        this.router.navigate(['login']);
      }
    });

    this.http.get<IBook[]>('http://api.mano/api/elenco.php')
    .subscribe(data => {
      this.books = data;
      this.pages = Math.ceil(this.books.length / 20);
      this.SetPage(1);
    });

    this.http.get<ICategory[]>('http://api.mano/api/categorie.php')
    .subscribe(data => {
      this.categories = data;
    });
  }

  SearchTitle() {
    if (this.inputCat.CATEGORY_ID != null && this.inputCat.CATEGORY_ID > 0) {
      this.FullFilter();
    } else {
      this.http.get<IBook[]>(`http://api.mano/api/elenco.php?title=${this.inputBook.TITLE}`)
      .subscribe(data => {
        this.books = data;
        this.pages = Math.ceil(this.books.length / 20);
        this.SetPage(1);
      });
    }
  }

  CategoryFilter() {
    if (this.inputBook.TITLE != null && this.inputBook.TITLE.length > 0) {
      this.FullFilter();
    } else {
      this.http.get<IBook[]>(`http://api.mano/api/elenco.php?category=${this.inputCat.CATEGORY_ID}`)
      .subscribe(data => {
        this.books = data;
        this.pages = Math.ceil(this.books.length / 20);
        this.SetPage(1);
      });
    }
  }

  FullFilter() {
    this.http.get<IBook[]>(`http://api.mano/api/elenco.php?title=${this.inputBook.TITLE}&category=${this.inputCat.CATEGORY_ID}`)
    .subscribe(data => {
      this.books = data;
      this.pages = Math.ceil(this.books.length / 20);
      this.SetPage(1);
    });
  }

  AddToCart(id: number, qty: number) {
    this.http.post<boolean>('http://api.mano/api/carrello.php', { 'method': 'add', 'bookid': id, 'bookqty': qty })
    .subscribe(data=> {
      if (data) {
        this.router.navigate(['cart']);
      } else {
        alert("Non è possibile inserire l'articolo");
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

  SetPage(pageNr: number) {
    this.currentPageNr = pageNr;
    let offsetStart: number = (this.currentPageNr - 1) * 20;
    this.page = this.books.slice(offsetStart, offsetStart + 20);
  }

  NextPage() {
    if (this.currentPageNr < this.pages) {
      ++this.currentPageNr;
      this.SetPage(this.currentPageNr);
    }
  }

  PrevPage() {
    if (this.currentPageNr > 1) {
      --this.currentPageNr;
      this.SetPage(this.currentPageNr);
    }
  }
}
