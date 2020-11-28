import { Component } from '@angular/core';
import { ModalComponent } from '../app/modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'stomana-frontend';

  constructor() {

  }

  }

  // displayStock(): any {
  //   this.crudService.getStockList(this.user).subscribe(row => {
  //     this.resp = row.map(e => {
  //       let data = e.payload.doc.data();
  //       let st = new Stock();
  //       st.name = data.name;
  //       st.buyPrice = data.buyPrice;
  //       st.sellPrice = data.sellPrice;
  //       st.dpCharges = data.dpCharges;
  //       st.quantity = data.quantity;
  //       st.tax = data.tax;
  //       st.otherCharges = data.otherCharges;
  //       this.stockArr.push(st);
  //     });
  //   });
  // }

