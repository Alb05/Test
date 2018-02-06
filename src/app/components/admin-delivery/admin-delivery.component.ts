import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-delivery',
  templateUrl: './admin-delivery.component.html',
  styleUrls: ['./admin-delivery.component.css']
})
export class AdminDeliveryComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.http.get<boolean>('http://api.mano/api/sesstat.php')
    .subscribe(data => {
      if (!data) {
        this.router.navigate(['login']);
      }
    });

    this.http.get<boolean>('http://api.mano/api/adstat.php')
    .subscribe(data => {
      if (!data) {
        this.router.navigate(['delivery']);
        alert("Non hai i permessi da amministratore");
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
