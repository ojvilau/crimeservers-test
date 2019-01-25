import { Component, Input, Output, EventEmitter } from "@angular/core";
import { OnChanges } from "@angular/core";

@Component({
  selector: "pagination",
  template: `
    <style>
      li {
        cursor: pointer;
      }
    </style>
        <ul class="pagination justify-content-center" *ngIf="totalItems > pageSize">
          <li class="page-item" [class.disabled]="currentPage == 1">
            <a class="page-link" (click)="previous()" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item" [class.active]="currentPage == page" *ngFor="let page of pages" (click)="changePage(page)">
            <a class="page-link">{{page}}</a>
          </li>
          <li class="page-item" [class.disabled]="currentPage == pagesTotal.length">
            <a class="page-link" (click)="next()" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
`
})
export class PaginationComponent implements OnChanges {
  @Input("total-items") totalItems;
  @Input("page-size") pageSize = 10;
  @Output("page-changed") pageChanged = new EventEmitter();
  pages: any[];
  pagesTotal: any[];
  currentPage = 1;

  ngOnChanges() {
    this.currentPage = 1;

    var pagesCount = Math.ceil(this.totalItems / this.pageSize);
    this.pages = [1,2,3,4,5,6,7,8,9,10];
    this.pagesTotal = []
    for (var i = 1; i <= pagesCount; i++){
      this.pagesTotal.push(i);
    }
      
  }

  changePage(page) {
    this.currentPage = page;
    this.pageChanged.emit(page);

    // extract the last page and put a page-1 at the begining, to keep only 10 pages visible
    if(this.pages[0] == this.currentPage && this.currentPage != 1){
      this.pages.pop();
      this.pages = [ this.currentPage - 1, ...this.pages ];
    }
    // extract the first page and put a page+1 at the end, to keep only 10 pages visible
    if(this.pages[this.pages.length-1] == this.currentPage && this.currentPage != this.pagesTotal.length){
      this.pages = this.pages.filter(item => {        
        return item != this.currentPage - 9;
      });
      this.pages = [...this.pages, this.currentPage + 1];
    }
  }

  previous() {
    if (this.currentPage == 1) return;

    // extract the last page and put a page-1 at the begining, to keep only 10 pages visible
    if(this.pages[0] == this.currentPage - 1 && this.currentPage-1 != 1){
      this.pages.pop();
      this.pages = [ this.currentPage - 2, ...this.pages ];
    }

    this.currentPage--;
    this.pageChanged.emit(this.currentPage);
  }

  next() {
    if (this.currentPage == this.pagesTotal.length) return;

    // extract the first page and put a page+1 at the end, to keep only 10 pages visible
    if(this.pages[this.pages.length-1] == this.currentPage + 1 && this.currentPage + 1 != this.pagesTotal.length){
      this.pages = this.pages.filter(item => {        
        return item != this.currentPage - 8;
      });
      this.pages = [...this.pages, this.currentPage + 2];
    }

    this.currentPage++;
    this.pageChanged.emit(this.currentPage);
  }
}