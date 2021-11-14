import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import { MatPaginator} from '@angular/material/paginator';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PopupDetailsComponent } from 'src/app/shared/common/popup-details/popup-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  dataSource = new MatTableDataSource();

  displayedColumns: string[] = [ 'Name', 'email','status','action'];



  @ViewChild(MatPaginator, {static: true} ) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  constructor(
    private spinner: NgxSpinnerService,
    private api: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private dialog: MatDialog
    ) { }
  
    ngAfterViewInit() {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      
  }
  
  ngOnInit(): void {
    this.employeeDetails();
} 
  employeeDetails() {
    this.api.functionGET('company/1/employee?search=&limit=147&page=1&orderBy=ASC&sortBy=createdAt').subscribe((response)=>{
    this.dataSource.data=response.result.rows;
  })
  }

  viewDetails(dataSource){
    const dialogRef=this.dialog.open(PopupDetailsComponent,{
      data:{
        title:"Employee",
         item:dataSource
      }
    });
    dialogRef.afterClosed().subscribe(result=>{
      console.log("console ", result)
    })
  
  }
}
