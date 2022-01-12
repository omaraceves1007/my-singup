import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home.component';
import { SummaryComponent } from '../../components/summary/summary.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { PurchaseFormComponent } from '../../components/purchase-form/purchase-form.component';

import { HomeRoutingModule } from './home-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ResponseSnackComponent } from '../../components/response-snack/response-snack.component';



@NgModule({
  declarations: [HomeComponent, SummaryComponent, ProductCardComponent, PurchaseFormComponent, ResponseSnackComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatDialogModule
  ]
})
export class HomeModule { }
