import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-details',
  templateUrl: './popup-details.component.html',
  styleUrls: ['./popup-details.component.scss']
})
export class PopupDetailsComponent implements OnInit {

  details:any;
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data) { }
  
  ngOnInit(): void {
    this.details=this.data;
    console.log(this.details);
  }

}
