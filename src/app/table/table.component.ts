import { Component, OnInit } from '@angular/core';
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
  data: any[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.itemsPerPage = 20;
    this.currentPage = 1;
    this.request();
  }

  itemsPerPageChange(perPage) {
    this.itemsPerPage = perPage;
    this.request();
  }

  request() {
    this.apiService.load(this.currentPage, this.itemsPerPage).then( (response) => {
      this.itemsTotal = response.totalNum;
      this.data = response.data;
      this.totalPages = Math.ceil(this.itemsTotal / this.itemsPerPage);
    });
  }

    pageChaned(p) {
      this.currentPage = p;
      this.request();
  }

}
