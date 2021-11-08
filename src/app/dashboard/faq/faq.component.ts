import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/service/api.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor(
    /* private api: ApiService */
    ) { }

  ngOnInit(): void {
  }

}
