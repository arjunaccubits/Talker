import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private api: ApiService
    ) { }

  ngOnInit(): void {
  }
  

}
