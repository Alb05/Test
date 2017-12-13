import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPerson } from '../../models/person.model';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public people: IPerson[];
  public user: IPerson;

  @ViewChild("userForm")
  userForm: NgForm;
  
  constructor(private http: HttpClient) {
    this.user = {
      userId: null,
      username: null,
      firstName: null,
      lastName: null,
      mail: null,
      phone: null,
      address: null,
      city: null,
      postalCode: null,
      country: null,
      password: null,
    };
  }

  OnSubmit() {
    this.http.get<IPerson[]>(`http://api.test/test?id=${this.user.userId}`)
    .subscribe(data => {
      this.people = data;
    });
  }
}
