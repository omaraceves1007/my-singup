import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PurchaseFormComponent } from './purchase-form.component';

import * as moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { By } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';

const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

describe('PurchaseFormComponent', () => {
  let component: PurchaseFormComponent;
  let fixture: ComponentFixture<PurchaseFormComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchaseFormComponent],
      imports: [
        ReactiveFormsModule,
        MatCheckboxModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatDatepickerModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: DateAdapter,
          useClass: MomentDateAdapter,
          deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
        },

        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
      ],
    })
      .compileComponents();
    fixture = TestBed.createComponent(PurchaseFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial values in form', () => {
    const formVals = component.form.value;
    formVals.date = formVals.date.format('MM / YYYY');
    const values = {
      firstName: '',
      lastName: '',
      email: '',
      card: '',
      date: moment().format('MM / YYYY'),
      ccv: '',
      bAddress: '',
      bCity: '',
      bState: '',
      bZip: ''
    };
    fixture.detectChanges();

    expect(JSON.stringify(formVals)).toEqual(JSON.stringify(values));
  });

  it('should form start as invalid state', () => {
    const form = component.form;

    expect(form.valid).toEqual(false);
  });

  it('should form be valid ones fulfilled', () => {
    const form = component.form;
    const inputs: HTMLInputElement[] = el.nativeElement.querySelectorAll('input');
    const firstName = inputs[0];
    firstName.value = 'Omar'
    const lastName = inputs[1]
    lastName.value = 'Aceves'
    const email = inputs[2];
    email.value = 'oeacev@gmail.com'
    const card = inputs[3];
    card.value = '4112344112344113'
    const ccv = inputs[5]
    ccv.value = '547'
    const bAddress = inputs[6]
    bAddress.value = 'calle 13'
    const bCity = inputs[7]
    bCity.value = 'México'
    const bState = inputs[8]
    bState.value = 'CDMX'
    const bZip = inputs[9]
    bZip.value = '45781'
    firstName.dispatchEvent(new Event('input'));
    lastName.dispatchEvent(new Event('input'));
    email.dispatchEvent(new Event('input'));
    card.dispatchEvent(new Event('input'));
    ccv.dispatchEvent(new Event('input'));
    bAddress.dispatchEvent(new Event('input'));
    bCity.dispatchEvent(new Event('input'));
    bState.dispatchEvent(new Event('input'));
    bZip.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    expect(component.form.controls['firstName'].valid).toBeTruthy();
    expect(component.form.controls['lastName'].valid).toBeTruthy();
    expect(component.form.controls['email'].valid).toBeTruthy();
    expect(component.form.controls['card'].valid).toBeTruthy();
    expect(component.form.controls['date'].valid).toBeTruthy();
    expect(component.form.controls['ccv'].valid).toBeTruthy();
    expect(component.form.controls['bAddress'].valid).toBeTruthy();
    expect(component.form.controls['bCity'].valid).toBeTruthy();
    expect(component.form.controls['bState'].valid).toBeTruthy();
    expect(component.form.controls['bZip'].valid).toBeTruthy();

    expect(form.valid).toBeTruthy();
  });


});
