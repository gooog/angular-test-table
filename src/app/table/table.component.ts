import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  itemsTotal: number;
  itemsPerPage: number;
  currentPage: number;
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
      console.log(response);

      this.itemsTotal = response.totalNum;
      this.data = response.data;
    });
  }

  pageChanging(p) {
    console.log('pagen envent detected:', p);
  }

}
