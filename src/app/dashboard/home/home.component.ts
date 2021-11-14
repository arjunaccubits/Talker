import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { MatTableDataSource } from '@angular/material/table';

import { MatSort} from '@angular/material/sort';
//import { MatPaginator} from '@angular/material/paginator';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PopupDetailsComponent } from 'src/app/shared/common/popup-details/popup-details.component';
import { MatDialog } from '@angular/material/dialog';


export interface PeriodicElement {
  status: string;
  company: string;

}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataSource = new MatTableDataSource();

  displayedColumns: string[] = [ 'name', 'status','action'];


  
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  constructor(
    private spinner: NgxSpinnerService,
    private api: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private dialog: MatDialog
    ) { }

  
  ngOnInit(){
    this.companyDetails();
}
companyDetails(){
  this.api.functionGET('appConfiguration/company').subscribe((response)=>{
    this.dataSource.data=response.result;
  })
}
viewDetails(dataSource){
  const dialogRef=this.dialog.open(PopupDetailsComponent,{
    data:{
      title:"Company",
       item:dataSource
    }
  });
  dialogRef.afterClosed().subscribe(result=>{
    console.log("console ", result)
  //  if (result){
    //  this.toastr.success("popup closed")
  //  }
  })

}

}
