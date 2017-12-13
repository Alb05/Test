import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPerson } from '../../models/person.model';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-ajax',
  templateUrl: './ajax.component.html',
  styleUrls: ['./ajax.component.css']
})
export class AjaxComponent {

  public people: IPerson[];
  public user: IPerson;

  @ViewChild("userForm")
  userForm: NgForm;
  
  constructor(private http: HttpClient) {
    this.user = {
      id: null,
      nome: null,
      cognome: null,
      anni: null
    };
  }

  OnSubmit() {
    this.http.get<IPerson[]>(`http://api.test/test?id=${this.user.id}`)
    .subscribe(data => {
      this.people = data;
    });
  }
}
