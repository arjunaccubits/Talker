import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { forkJoin, throwError, Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private spinner: NgxSpinnerService ,
    
    private toastr: ToastrService
  ) { }

  baseUrl = environment.API;
    
  

  // GET
  functionGET(url: string) {
    const Link = this.baseUrl + url;
    const header = new HttpHeaders().set('Authorization', localStorage.getItem('token'));
    const headers = { headers: header };
    return this.http.get(Link, headers)
      .pipe(map(Response => this.checkResponse(Response)),
        catchError((error) => throwError(this.handleError(error))));
  } 

  // POST
  functionPOST(url: string, data: any, token?): Observable<any> {
    const Link = this.baseUrl + url;
    const header:any={}
    if (token){
      const header = new HttpHeaders()
    }
    else {
      const header = new HttpHeaders().set('Authorization', localStorage.getItem('token'));
    }
    
    const headers = { headers: header };
    return this.http.post(Link, data, headers)
      .pipe(map(Response => this.checkResponse(Response)),
        catchError((error) => throwError(this.handleError(error))));
  }

  // PUT
  functionPUT(url: string, data: any): Observable<any> {
    const Link = this.baseUrl + url;
     const header = new HttpHeaders().set('Authorization', localStorage.getItem('token'));
    const headers = { headers: header };
    return this.http.put(Link, data, headers)
      .pipe(map(Response => this.checkResponse(Response)),
        catchError((error) => throwError(this.handleError(error))));
  }

  // DELETE
  functionDelete(url: string) {
    const Link = this.baseUrl + url;
    const header = new HttpHeaders().set('Authorization', localStorage.getItem('token'));
    const headers = { headers: header };
    return this.http.delete(Link, headers)
      .pipe(map(Response => this.checkResponse(Response)),
        catchError((error) => throwError(this.handleError(error))));
  } 
 

  // Handler
  checkResponse(response: any) {
    const results = response;
    if (results['success'] || results['status']) {
      return results;
    } else {
      return { 'error': results['error'] };
    }
  }
 
  handleError(error: any): any {
    switch (error.status) {
      case 204:
        //this.toastr.error(error['error']['data'], '');
        break;
      case 403:
       // this.toastr.error(error['error']['data'], '');
        this.cookieService.deleteAll();
        this.router.navigate(['/']);
        break;
      default:
       // this.toastr.error(error['error']['data'], '');
        return error.error;
    }
  }
}