import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { v4 as uuidv4 } from 'uuid';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  formGroup: FormGroup;
  cookieValue: string;
  

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private spinner: NgxSpinnerService,
    private router: Router

    ) {
      this.cookieService.set('X-Auth-Token', uuidv4());
      this.cookieValue = this.cookieService.get('X-Auth-Token');
     }
  
  

  ngOnInit() {
      this.createForm();
      
  }
 

  createForm() {
    this.formGroup = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
    });
  }

  getError(el) {
    switch (el) {
      case 'user':
        if (this.formGroup.get('username').hasError('required')) {
          return 'Username is required';
        }
        break;
      case 'pass':
        if (this.formGroup.get('password').hasError('required')) {
          return 'Password is required';
        }
        break;
      default:
        return '';
    }
  }

  onSubmit() {
  
    if (this.formGroup.invalid){
      this.toastr.error('wrong,please enter valid credentials' )
      return  ;
      }
      this.spinner.show();
      

      console.log(this.formGroup.value);
      this.api.functionPOST('auth/login/hr',this.formGroup.value, true).subscribe((response)=>{
      console.log('response', response);
      this.toastr.success(response.message);
      this.spinner.hide();

      localStorage.setItem('token', response.result.token);
      localStorage.setItem('fName', response.result.firstName);
      this.router.navigate(['home']);
     },

     
     (error)=>{
       console.log(error)
       this.toastr.error(error.message)
       this.spinner.hide();
     }) 

    }

}
  

    
    