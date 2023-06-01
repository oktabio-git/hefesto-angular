import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [NavbarComponent, PaginationComponent],
  imports: [CommonModule],
  exports: [NavbarComponent, PaginationComponent],
})
export class LayoutModule {}
