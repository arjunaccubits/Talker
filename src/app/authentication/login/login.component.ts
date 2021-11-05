import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { v4 as uuidv4 } from 'uuid';

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
    private toastr: ToastrService,
    private cookieService: CookieService
    ) {
      this.cookieService.set('X-Auth-Token', uuidv4());
      this.cookieValue = this.cookieService.get('X-Auth-Token');
     }
  
  
  /* name = new FormControl('', [Validators.required, Validators.minLength(1),
    Validators.maxLength(12)]);

  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }

    return this.name.hasError('name') ? 'Not a valid name' : '';
  } */

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

  onSubmit(formGroup) {
    // this.post = post;
  }
  onClick(){
    this.toastr.success('Hello, you are logged in!');
  }
}
