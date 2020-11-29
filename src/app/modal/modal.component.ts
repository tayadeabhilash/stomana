import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Stock } from '../stock.model';
import { User } from '../user.model';
import json from '../../assets/nse.json';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit {

  unSubAll = new Subject();
  stock = new Stock();
  user = new User();
  stockNameArray = [];
  addStockForm: FormGroup;
  filteredNames: Observable<string[]>;
  validationMessages = {
    name: {
      required: 'Name is required.',
    },
    buyPrice: {
      required: 'Buy price is required.'
    },
    sellPrice: {
      required: 'Sell price is required.'
    },
    quantity: {
      required: 'Quantity is required.'
    },
  };
  formErrors = {
    name: '',
    buyPrice: '',
    sellPrice: '',
    quantity: ''
  };
  constructor(public crudService: CrudService, public fb: FormBuilder) {
    this.user.username = 'ElgDBH1JWaHbU168Adkv';
    this.user.password = '';
    this.processJson();
  }

  ngOnInit(): void {
    this.addStockForm = this.fb.group({
      name: ['', Validators.required],
      buyPrice: ['', Validators.required],
      sellPrice: ['', Validators.required],
      quantity: ['', Validators.required],
      dpCharges: [''],
      tax: [''],
      otherCharges: [''],
    });

    this.addStockForm.valueChanges.subscribe((data) => {
      this.logFormErrors(this.addStockForm);
    });
    this.filteredNames = this.addStockForm.get('name').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  ngOnDestroy(): void {
    this.unSubAll.next();
    this.unSubAll.complete();
  }

  logFormErrors(group: FormGroup = this.addStockForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }
    });
  }

  createStock(): void {
    if (this.addStockForm.get('name').value === '' || this.addStockForm.get('buyPrice').value === '' ||
      this.addStockForm.get('sellPrice').value === '' || this.addStockForm.get('quantity').value === '') {
      this.logFormErrors();
    }
    else {
      this.crudService.create_NewStock(this.addStockForm.value, this.user).then(res => {
        this.clearForm();
      }).catch((error: any) => {
        console.log(error);
      });
    }
  }

  processJson(): any {
    json.forEach((obj: any) => {
      this.stockNameArray.push(obj['NAME OF COMPANY']);
    });
  }

  private _filter(value: string): string[] {
    if (value === null) {
      value = '';
    }
    const filterValue = this._normalizeValue(value);
    return this.stockNameArray.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  clearForm(): void {
    // this.addStockForm.setValue({
    //   name: '',
    //   buyPrice: '',
    //   sellPrice: '',
    //   quantity: '',
    //   dpCharges: '',
    //   tax: '',
    //   otherCharges: ''
    // });
    this.addStockForm.reset('');
    this.filteredNames = this.addStockForm.get('name').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
}
