import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

import { ApiService } from '../../shared/service/api.service';
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
    private spinner: NgxSpinnerService
    ) {
      this.cookieService.set('X-Auth-Token', uuidv4());
      this.cookieValue = this.cookieService.get('X-Auth-Token');
     }
  
  

  ngOnInit() {
      this.createForm();
      this.spinner.show();

    setTimeout(() => {
     
      this.spinner.hide();
    }, 3000);
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

  onSubmit(formGroup) {
    // this.post = post;
  }
  onClick(){
    this.toastr.success('Hello, you are logged in!');
  }
}
