import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../models/user.model';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: IUser;
  public userInput: IUser;

  @ViewChild("userForm")
  userForm: NgForm;
  
  constructor(private http: HttpClient, private router: Router) {
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
      CHECK_PWD: null,
      CREATED_AT: null,
      UPDATED_AT: null,
      DELETED_AT: null,
      DELETED: null,
      GROUP_ID: null
    };
  }

  ngOnInit(): void {
    this.http.get<boolean>('http://api.mano/api/sesstat.php')
    .subscribe(data => {
      if (data) {
        this.router.navigate(['home']);
      }
    });
  }

  OnSubmit() {
    this.http.post<boolean>('http://api.mano/api/login.php', { 'mail': this.userInput.MAIL, 'password': this.userInput.PASSWORD })
    .subscribe(data => {
      if (data) {
        this.router.navigate(['home'])
      } else {
        alert("l'username e/o la password sono errati");
      }
    });
  }
}
