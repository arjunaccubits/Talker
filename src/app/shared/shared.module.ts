import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HeaderComponent } from './common/header/header.component';
import { SideMenuComponent } from './common/side-menu/side-menu.component';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    HeaderComponent,
    SideMenuComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatButtonModule,
    MatButtonToggleModule,
    FlexLayoutModule    
  ],
  exports: [HeaderComponent, SideMenuComponent]
})
export class SharedModule { }
