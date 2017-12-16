import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../models/user.model';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public user: IUser;
  public userInput: IUser;

  @ViewChild("userForm")
  userForm: NgForm;
  
  constructor(private http: HttpClient) {
    this.userInput = {
      USER_ID: null,
      USERNAME: null,
      FIRST_NAME: null,
      LAST_NAME: null,
      MAIL: null,
      PHONE: null,
      ADDRESS: null,
      CITY: null,
      POSTAL_CODE: null,
      COUNTRY: null,
      SALT: null,
      PASSWORD: null,
      CREATED_AT: null,
      UPDATED_AT: null,
      DELETED_AT: null,
      DELETED: null,
      GROUP_ID: null
    };
  }

  OnSubmit() {
    this.http.post<boolean>('http://api.mano/api/login', { 'username': this.userInput.USERNAME, 'password': this.userInput.PASSWORD })
    .subscribe(data => {
      console.log(data);
    });
  }
}
