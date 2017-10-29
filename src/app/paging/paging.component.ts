import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-paging',
    templateUrl: './paging.component.html',
    styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {

    @Input() totalPages = 1;
    @Input() activePage = 1;
    @Output() onPageChange = new EventEmitter();

    pages: any[];

    constructor() { }

    ngOnInit() {
        this.generatePages();
    }

    generatePages() {
        this.pages = [];

        if (this.activePage !== 1) {
            this.pages.push(1);
        }

        if ((this.activePage - 2) > 1) {
            this.pages.push('...');
        }

        if (this.activePage > 2) {
            this.pages.push(this.activePage - 1);
        }

        this.pages.push(this.activePage);

        if ((this.totalPages - 1) > this.activePage) {
            this.pages.push(this.activePage + 1);
        }

        if ((this.totalPages - 2) > this.activePage) {
            this.pages.push('...');
        }

        if (this.activePage !== this.totalPages) {
            this.pages.push(this.totalPages);
        }
    }

    pChange(p) {
        this.activePage = p;
        this.onPageChange.emit(p);
        this.generatePages();
    }

}
