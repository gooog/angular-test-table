import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {

  @Input() totalPages: number;
  @Input() activePage: number;
  @Output() pageChange = new EventEmitter();

  pages: any[];

  constructor() { }

  ngOnInit() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  pChange(p) {
    this.pageChange.emit(p);
  }

}
