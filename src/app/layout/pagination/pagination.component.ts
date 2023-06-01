import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Output() changePageEvent = new EventEmitter<number>();
  @Input() totalPages: number = 0;

  pageNumber: number = 0;
  startPage: number = 0;

  changePage(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.changePageEvent.next(pageNumber);
  }
}
