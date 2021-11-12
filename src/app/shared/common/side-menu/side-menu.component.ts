import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  
  
  name="";
  email="";

  constructor(
    private api: ApiService,
    private router: Router,
    private cookie: CookieService 
    ) 
    { }

  ngOnInit(): void {
    this.name=localStorage.getItem('fName');
    this.email=this.cookie.get('email');
  }

}
