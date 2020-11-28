import { Component, AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CrudService } from '../service/crud.service';
import { Stock } from '../stock.model';
import { User } from '../user.model';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements AfterViewInit {

  displayedColumns: string[] = ['name', 'buyPrice', 'sellPrice', 'quantity', 'pl'];
  dataSource: MatTableDataSource<Stock>;
  user = new User();
  stockArr = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public crudService: CrudService) {
    this.user.username = 'ElgDBH1JWaHbU168Adkv';
    this.user.password = '';
    this.displayStock();
  }
  ngAfterViewInit(): void {

  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  displayStock(): any {
    this.crudService.getStockList(this.user).subscribe(row => {
      this.stockArr = row.map(e => {
        const total = (e.payload.doc.data().sellPrice - e.payload.doc.data().buyPrice) * e.payload.doc.data().quantity -
          e.payload.doc.data().dpCharges - e.payload.doc.data().tax - e.payload.doc.data().otherCharges;
        return {
          name: e.payload.doc.id,
          ...e.payload.doc.data(),
          pl: total < 0 ? total : '+' + total,
          color: total < 0 ? '#FF6276' : '#31FF54',
        } as Stock;
      });
      this.dataSource = new MatTableDataSource(this.stockArr);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
