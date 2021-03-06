import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IIntelligence } from '../../models/intelligence.model';

@Component({
  selector: 'app-admin-intelligence',
  templateUrl: './admin-intelligence.component.html',
  styleUrls: ['./admin-intelligence.component.css']
})
export class AdminIntelligenceComponent implements OnInit {

  public stats: IIntelligence;

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

    this.http.get<IIntelligence>('http://api.mano/api/intelligence.php')
    .subscribe(data => {
      this.stats = data;
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
