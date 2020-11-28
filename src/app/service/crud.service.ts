import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Stock } from '../stock.model';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(public fireservices: AngularFirestore) { }

  create_NewStock(stock: Stock, user: User): any {
    return this.fireservices.doc('users/' + user.username).collection('stockData').doc(stock.name).set(Object.assign({}, stock));
  }
  getStockList(user: User): any {
    return this.fireservices.doc('users/' + user.username).collection('stockData').snapshotChanges();
  }

  // updatePolicy(stock: Stock) {
  //   delete stock.name;
  //   this.fireservices.doc('policies/' + policy.id).update(policy);
  // }

  deletePolicy(name: string): any {
    this.fireservices.doc('policies/' + name).delete();
  }
}
