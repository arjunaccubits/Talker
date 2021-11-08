import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


export interface PeriodicElement {
  contact: string;
  company: string;
  country: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {company: 'Alfreds Futterkiste', contact: 'Maria Anders', country: 'Germany'},
  {company: 'Centro comercial Moctezuma', contact: 'Francisco Chang', country: 'Mexico'},
  {company: 'Ernst Handel', contact: 'Lithium',  country: 'Austria'},
  {company: 'Island Trading', contact: 'Helen Bennett',  country: 'UK'},
  {company: 'Laughing Bacchus Winecellars', contact: 'Yoshi Tannamuri', country: 'Canada'},
  {company: 'Magazzini Alimentari Riuniti', contact: 'Giovanni Rovelli', country: 'Italy'},
  {company: 'Alfreds Futterkiste', contact: 'Maria Anders', country: 'Germany'},
  {company: 'Centro comercial Moctezuma', contact: 'Francisco Chang', country: 'Mexico'},
  {company: 'Ernst Handel', contact: 'Lithium',  country: 'Austria'},
  {company: 'Island Trading', contact: 'Helen Bennett',  country: 'UK'},
  {company: 'Laughing Bacchus Winecellars', contact: 'Yoshi Tannamuri', country: 'Canada'},
  {company: 'Magazzini Alimentari Riuniti', contact: 'Giovanni Rovelli', country: 'Italy'},
  {company: 'Alfreds Futterkiste', contact: 'Maria Anders', country: 'Germany'},
  {company: 'Centro comercial Moctezuma', contact: 'Francisco Chang', country: 'Mexico'},
  {company: 'Ernst Handel', contact: 'Lithium',  country: 'Austria'},
  {company: 'Island Trading', contact: 'Helen Bennett',  country: 'UK'},
  {company: 'Laughing Bacchus Winecellars', contact: 'Yoshi Tannamuri', country: 'Canada'},
  {company: 'Magazzini Alimentari Riuniti', contact: 'Giovanni Rovelli', country: 'Italy'},
  {company: 'Alfreds Futterkiste', contact: 'Maria Anders', country: 'Germany'},
  {company: 'Centro comercial Moctezuma', contact: 'Francisco Chang', country: 'Mexico'},
  {company: 'Ernst Handel', contact: 'Lithium',  country: 'Austria'},
  {company: 'Island Trading', contact: 'Helen Bennett',  country: 'UK'},
  {company: 'Laughing Bacchus Winecellars', contact: 'Yoshi Tannamuri', country: 'Canada'},
  {company: 'Magazzini Alimentari Riuniti', contact: 'Giovanni Rovelli', country: 'Italy'},
  {company: 'Alfreds Futterkiste', contact: 'Maria Anders', country: 'Germany'},
  {company: 'Centro comercial Moctezuma', contact: 'Francisco Chang', country: 'Mexico'},
  {company: 'Ernst Handel', contact: 'Lithium',  country: 'Austria'},
  {company: 'Island Trading', contact: 'Helen Bennett',  country: 'UK'},
  {company: 'Laughing Bacchus Winecellars', contact: 'Yoshi Tannamuri', country: 'Canada'},
  {company: 'Magazzini Alimentari Riuniti', contact: 'Giovanni Rovelli', country: 'Italy'},
  {company: 'Alfreds Futterkiste', contact: 'Maria Anders', country: 'Germany'},
  {company: 'Centro comercial Moctezuma', contact: 'Francisco Chang', country: 'Mexico'},
  {company: 'Ernst Handel', contact: 'Lithium',  country: 'Austria'},
  {company: 'Island Trading', contact: 'Helen Bennett',  country: 'UK'},
  {company: 'Laughing Bacchus Winecellars', contact: 'Yoshi Tannamuri', country: 'Canada'},
  {company: 'Magazzini Alimentari Riuniti', contact: 'Giovanni Rovelli', country: 'Italy'},
  {company: 'Alfreds Futterkiste', contact: 'Maria Anders', country: 'Germany'},
  {company: 'Centro comercial Moctezuma', contact: 'Francisco Chang', country: 'Mexico'},
  {company: 'Ernst Handel', contact: 'Lithium',  country: 'Austria'},
  {company: 'Island Trading', contact: 'Helen Bennett',  country: 'UK'},
  {company: 'Laughing Bacchus Winecellars', contact: 'Yoshi Tannamuri', country: 'Canada'},
  {company: 'Magazzini Alimentari Riuniti', contact: 'Giovanni Rovelli', country: 'Italy'},
  {company: 'Alfreds Futterkiste', contact: 'Maria Anders', country: 'Germany'},
  {company: 'Centro comercial Moctezuma', contact: 'Francisco Chang', country: 'Mexico'},
  {company: 'Ernst Handel', contact: 'Lithium',  country: 'Austria'},
  {company: 'Island Trading', contact: 'Helen Bennett',  country: 'UK'},
  {company: 'Laughing Bacchus Winecellars', contact: 'Yoshi Tannamuri', country: 'Canada'},
  {company: 'Magazzini Alimentari Riuniti', contact: 'Giovanni Rovelli', country: 'Italy'},
  {company: 'Alfreds Futterkiste', contact: 'Maria Anders', country: 'Germany'},
  {company: 'Centro comercial Moctezuma', contact: 'Francisco Chang', country: 'Mexico'},
  {company: 'Ernst Handel', contact: 'Lithium',  country: 'Austria'},
  {company: 'Island Trading', contact: 'Helen Bennett',  country: 'UK'},
  {company: 'Laughing Bacchus Winecellars', contact: 'Yoshi Tannamuri', country: 'Canada'},
  {company: 'Magazzini Alimentari Riuniti', contact: 'Giovanni Rovelli', country: 'Italy'},
  {company: 'Alfreds Futterkiste', contact: 'Maria Anders', country: 'Germany'},
  {company: 'Centro comercial Moctezuma', contact: 'Francisco Chang', country: 'Mexico'},
  {company: 'Ernst Handel', contact: 'Lithium',  country: 'Austria'},
  {company: 'Island Trading', contact: 'Helen Bennett',  country: 'UK'},
  {company: 'Laughing Bacchus Winecellars', contact: 'Yoshi Tannamuri', country: 'Canada'},
  {company: 'Magazzini Alimentari Riuniti', contact: 'Giovanni Rovelli', country: 'Italy'},
  {company: 'Alfreds Futterkiste', contact: 'Maria Anders', country: 'Germany'},
  {company: 'Centro comercial Moctezuma', contact: 'Francisco Chang', country: 'Mexico'},
  {company: 'Ernst Handel', contact: 'Lithium',  country: 'Austria'},
  {company: 'Island Trading', contact: 'Helen Bennett',  country: 'UK'},
  {company: 'Laughing Bacchus Winecellars', contact: 'Yoshi Tannamuri', country: 'Canada'},
  {company: 'Magazzini Alimentari Riuniti', contact: 'Giovanni Rovelli', country: 'Italy'},
  {company: 'Alfreds Futterkiste', contact: 'Maria Anders', country: 'Germany'},
  {company: 'Centro comercial Moctezuma', contact: 'Francisco Chang', country: 'Mexico'},
  {company: 'Ernst Handel', contact: 'Lithium',  country: 'Austria'},
  {company: 'Island Trading', contact: 'Helen Bennett',  country: 'UK'},
  {company: 'Laughing Bacchus Winecellars', contact: 'Yoshi Tannamuri', country: 'Canada'},
  {company: 'Magazzini Alimentari Riuniti', contact: 'Giovanni Rovelli', country: 'Italy'},
  {company: 'Alfreds Futterkiste', contact: 'Maria Anders', country: 'Germany'},
  {company: 'Centro comercial Moctezuma', contact: 'Francisco Chang', country: 'Mexico'},
  {company: 'Ernst Handel', contact: 'Lithium',  country: 'Austria'},
  {company: 'Island Trading', contact: 'Helen Bennett',  country: 'UK'},
  {company: 'Laughing Bacchus Winecellars', contact: 'Yoshi Tannamuri', country: 'Canada'},
  {company: 'Magazzini Alimentari Riuniti', contact: 'Giovanni Rovelli', country: 'Italy'},
  {company: 'Alfreds Futterkiste', contact: 'Maria Anders', country: 'Germany'},
  {company: 'Centro comercial Moctezuma', contact: 'Francisco Chang', country: 'Mexico'},
  {company: 'Ernst Handel', contact: 'Lithium',  country: 'Austria'},
  {company: 'Island Trading', contact: 'Helen Bennett',  country: 'UK'},
  {company: 'Laughing Bacchus Winecellars', contact: 'Yoshi Tannamuri', country: 'Canada'},
  {company: 'Magazzini Alimentari Riuniti', contact: 'Giovanni Rovelli', country: 'Italy'},
  {company: 'Alfreds Futterkiste', contact: 'Maria Anders', country: 'Germany'},
  {company: 'Centro comercial Moctezuma', contact: 'Francisco Chang', country: 'Mexico'},
  {company: 'Ernst Handel', contact: 'Lithium',  country: 'Austria'},
  {company: 'Island Trading', contact: 'Helen Bennett',  country: 'UK'},
  {company: 'Laughing Bacchus Winecellars', contact: 'Yoshi Tannamuri', country: 'Canada'},
  {company: 'Magazzini Alimentari Riuniti', contact: 'Giovanni Rovelli', country: 'Italy'},
  {company: 'Alfreds Futterkiste', contact: 'Maria Anders', country: 'Germany'},
  {company: 'Centro comercial Moctezuma', contact: 'Francisco Chang', country: 'Mexico'},
  {company: 'Ernst Handel', contact: 'Lithium',  country: 'Austria'},
  {company: 'Island Trading', contact: 'Helen Bennett',  country: 'UK'},
  {company: 'Laughing Bacchus Winecellars', contact: 'Yoshi Tannamuri', country: 'Canada'},
  {company: 'Magazzini Alimentari Riuniti', contact: 'Giovanni Rovelli', country: 'Italy'},
  {company: 'Alfreds Futterkiste', contact: 'Maria Anders', country: 'Germany'},
  {company: 'Centro comercial Moctezuma', contact: 'Francisco Chang', country: 'Mexico'},
  {company: 'Ernst Handel', contact: 'Lithium',  country: 'Austria'},
  {company: 'Island Trading', contact: 'Helen Bennett',  country: 'UK'},
  {company: 'Laughing Bacchus Winecellars', contact: 'Yoshi Tannamuri', country: 'Canada'},
  {company: 'Magazzini Alimentari Riuniti', contact: 'Giovanni Rovelli', country: 'Italy'},
  {company: 'Alfreds Futterkiste', contact: 'Maria Anders', country: 'Germany'},
  {company: 'Centro comercial Moctezuma', contact: 'Francisco Chang', country: 'Mexico'},
  {company: 'Ernst Handel', contact: 'Lithium',  country: 'Austria'},
  {company: 'Island Trading', contact: 'Helen Bennett',  country: 'UK'},
  {company: 'Laughing Bacchus Winecellars', contact: 'Yoshi Tannamuri', country: 'Canada'},
  {company: 'Magazzini Alimentari Riuniti', contact: 'Giovanni Rovelli', country: 'Italy'},
  {company: 'Alfreds Futterkiste', contact: 'Maria Anders', country: 'Germany'},
  {company: 'Centro comercial Moctezuma', contact: 'Francisco Chang', country: 'Mexico'},
  {company: 'Ernst Handel', contact: 'Lithium',  country: 'Austria'},
  {company: 'Island Trading', contact: 'Helen Bennett',  country: 'UK'},
  {company: 'Laughing Bacchus Winecellars', contact: 'Yoshi Tannamuri', country: 'Canada'},
  {company: 'Magazzini Alimentari Riuniti', contact: 'Giovanni Rovelli', country: 'Italy'},
  {company: 'Alfreds Futterkiste', contact: 'Maria Anders', country: 'Germany'},
  {company: 'Centro comercial Moctezuma', contact: 'Francisco Chang', country: 'Mexico'},
  {company: 'Ernst Handel', contact: 'Lithium',  country: 'Austria'},
  {company: 'Island Trading', contact: 'Helen Bennett',  country: 'UK'},
  {company: 'Laughing Bacchus Winecellars', contact: 'Yoshi Tannamuri', country: 'Canada'},
  {company: 'Magazzini Alimentari Riuniti', contact: 'Giovanni Rovelli', country: 'Italy'},
  {company: 'Alfreds Futterkiste', contact: 'Maria Anders', country: 'Germany'},
  {company: 'Centro comercial Moctezuma', contact: 'Francisco Chang', country: 'Mexico'},
  {company: 'Ernst Handel', contact: 'Lithium',  country: 'Austria'},
  {company: 'Island Trading', contact: 'Helen Bennett',  country: 'UK'},
  {company: 'Laughing Bacchus Winecellars', contact: 'Yoshi Tannamuri', country: 'Canada'},
  {company: 'Magazzini Alimentari Riuniti', contact: 'Giovanni Rovelli', country: 'Italy'},
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['company', 'contact', 'country'];
  dataSource = new MatTableDataSource (ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true} ) paginator: MatPaginator;
  
  constructor(
    private spinner: NgxSpinnerService,
    private api: ApiService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit(){
    this.dataSource.paginator = this.paginator;
  }
  

}
