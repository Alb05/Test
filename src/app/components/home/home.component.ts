import { Component, OnInit } from '@angular/core';
import { IBook } from '../../models/book.model';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../../models/category.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  public books: IBook[];
  public categories: ICategory[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<IBook[]>('http://api.mano/api/elenco')
    .subscribe(data => {
      this.books = data;
    });
    this.http.get<ICategory[]>('http://api.mano/api/categorie')
    .subscribe(data => {
      this.categories = data;
    });
  }
}
