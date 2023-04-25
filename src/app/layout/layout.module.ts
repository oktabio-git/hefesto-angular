import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    NavbarComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent,
    PaginationComponent
  ]
})
export class LayoutModule { }
