import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  
  dataSource=[];

  constructor(
    private api: ApiService,
    private router: Router) 
    { }

  ngOnInit(): void {
  }

  showCompany(){
    this.api.functionGET('appConfiguration/company').subscribe((response)=>{
    this.dataSource=response.result;
      console.log('response', response);
      this.router.navigate(['home']);
     })
  }
  showEmployee(){
    this.api.functionGET('company/1/employee?search=&limit=10&page=1&orderBy=ASC&sortBy=createdAt').subscribe((response)=>{
      console.log('response', response);
      this.router.navigate(['faq']);
     })
  }
  showReimbursement(){
    this.api.functionGET('reimbursement?').subscribe((response)=>{
      console.log('response', response);
      this.router.navigate(['reimbursement']);
     })
  }
  
}
