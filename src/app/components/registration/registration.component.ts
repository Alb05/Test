import { Component } from '@angular/core';
import { IUser } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  public userInput: IUser;
  
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
    this.http.post<IUser>('http://api.mano/api/registration.php',
    {
      'username': this.userInput.USERNAME,
      'firstname': this.userInput.FIRST_NAME,
      'lastname': this.userInput.LAST_NAME,
      'mail': this.userInput.MAIL,
      'phone': this.userInput.PHONE,
      'address': this.userInput.ADDRESS,
      'city': this.userInput.CITY,
      'postalcode': this.userInput.POSTAL_CODE,
      'country': this.userInput.COUNTRY,
      'password': this.userInput.PASSWORD
    })
    .subscribe(data => {
      console.log(data);
    });
  }
}
