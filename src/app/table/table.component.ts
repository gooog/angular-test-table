import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  itemsTotal: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
  filter = {fieldName: '', orderType: ''};
  data: any[];

  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.itemsPerPage = 20;
    this.currentPage = 1;
    this.request();
  }

  itemsPerPageChange(perPage) {
    this.itemsPerPage = perPage;
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.itemsTotal / this.itemsPerPage );
    this.searchInput.nativeElement.value = '';
    this.request();
  }

  request() {
    this.apiService.load(this.currentPage, this.itemsPerPage, this.filter).then( (response) => {
      this.itemsTotal = response.totalNum;
      this.data = response.data;
      this.totalPages = Math.ceil(this.itemsTotal / this.itemsPerPage);
    });
  }

  pageChaned(p) {
      this.currentPage = p;
      this.request();
  }

  search(keyword: string) {
    if (keyword.length >= 2) {
      this.apiService.search(keyword, this.filter).then((data) => {
        this.itemsTotal = data.length;
        this.data = data;
        this.currentPage = 1;
        this.itemsPerPage = 20;
        this.totalPages = Math.ceil(this.itemsTotal / this.itemsPerPage);
      });
    } else {
      this.init();
    }
  }

  sortBy(fieldName: string) {
    const generatedOrderType = (this.filter.fieldName === fieldName) && (this.filter.orderType === 'ASC') ? 'DESC' : 'ASC';
    console.log(generatedOrderType);
    this.filter = {fieldName: fieldName, orderType: generatedOrderType };
    this.currentPage = 1;
    this.request();
  }

  setSortableClassName(fieldName: string) {
      if ( (this.filter.fieldName === fieldName) && (this.filter.orderType === 'ASC') ) {
        return 'sorted-asc';
      } else if ( (this.filter.fieldName === fieldName) && (this.filter.orderType === 'DESC') ) {
        return 'sorted-desc';
      }
  }

}
