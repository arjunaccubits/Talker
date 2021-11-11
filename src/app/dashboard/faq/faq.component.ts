import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import { MatPaginator} from '@angular/material/paginator';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  dataSource = new MatTableDataSource();

  displayedColumns: string[] = [ 'firstName', 'lastName', 'email'];



  @ViewChild(MatPaginator, {static: true} ) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  constructor(
    private spinner: NgxSpinnerService,
    private api: ApiService,
    private toastr: ToastrService,
    private router: Router
    ) { }
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator
  }
  
  ngOnInit(): void {
    this.api.functionGET('company/1/employee?search=&limit=10&page=1&orderBy=ASC&sortBy=createdAt').subscribe((response)=>{
      this.dataSource.data=response.result.rows;
  })
} 
}
