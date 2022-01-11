import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IProduct } from '../../models/product';
import { PurchaseService } from 'src/app/services/purchase.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public version = environment.version;
  public step1 = true;
  public step2 = false;
  public isValid = true;

  public items: IProduct[] = [
    { id: 'email', name: 'Rackspace Email', price: 2, quantity: 0, selected: false },
    { id: 'emailPlus', name: 'Rackspace Email Plus', price: 3.99, quantity: 0, selected: false },
    { id: 'microsoft', name: 'Microsoft Exchange', price: 10.99, quantity: 0, selected: false }
  ];
  public purchaseData: { user: IUser | any, items: IProduct[], total: number } = {
    user: {},
    items: JSON.parse(JSON.stringify(this.items)),
    total: 0
  };

  constructor(private _purchase: PurchaseService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  boxData(childData: { id: string, form: FormGroup }): void {
    if (childData.form.invalid) {
      this.isValid = true;
    } else {
      const prod = this.purchaseData.items.find((item: IProduct) => item.id === childData.id);
      prod!.quantity = childData.form.value.quantity;
      prod!.selected = true;
      this.purchaseData.items = [...this.purchaseData.items];
      this.isValid = false;
    }
  }

  next(event?: boolean): void {
    this.step1 = !this.step1;
    this.step2 = !this.step2;
    if (event) {
      this.isValid = true;
      this.purchaseData = {
        user: {},
        items: JSON.parse(JSON.stringify(this.items)),
        total: 0
      };
      this.items.forEach(item => {
        item.selected = false;
        item.quantity = 0;
      });
      this.items = [...this.items];
    }
  }

  addTotal(total: number):void {
    this.purchaseData.total = total;
  }

  userData(user: IUser): void {
    this.purchaseData.user = user;
    this.purchaseData.user.date = this.purchaseData.user.date.format();
    this.purchaseData.items = this.purchaseData.items.filter( (item: IProduct) => item.selected === true);
    this.saveForm();
  }

  saveForm(): void {
    const data = JSON.parse(JSON.stringify(this.purchaseData));
    this._purchase.purchase(data).subscribe(res => {
      console.log(res.data);
      this._snackBar.open('Guardado Correctamente', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
      this.next(true);
    });
  }

}
