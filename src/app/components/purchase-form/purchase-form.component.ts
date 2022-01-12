import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { cardValidator } from 'src/app/utils/card-validator';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

import * as moment from 'moment';
import { IUser } from 'src/app/models/user';


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

@Component({
    selector: 'app-purchase-form',
    templateUrl: './purchase-form.component.html',
    styleUrls: ['./purchase-form.component.scss'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
        },

        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class PurchaseFormComponent implements OnInit {

    @Output() sendForm = new EventEmitter<IUser>();
    @Output() cancelForm = new EventEmitter<boolean>();

    public form = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        card: ['', [Validators.required, cardValidator()]],
        date: [moment(), [Validators.required]],
        ccv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4), Validators.pattern('^[0-9]*$')]],
        bAddress: ['', [Validators.required]],
        bCity: ['', [Validators.required]],
        bState: ['', [Validators.required]],
        bZip: ['', [Validators.required]]
    });

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
    }

    chosenYearHandler(normalizedYear: any) {
        const ctrlValue = this.form.get('date')?.value;
        ctrlValue.year(normalizedYear.year());
        this.form.get('date')?.setValue(ctrlValue);
    }

    chosenMonthHandler(normalizedMonth: any, datepicker: MatDatepicker<any>) {
        const ctrlValue = this.form.get('date')?.value;
        ctrlValue.month(normalizedMonth.month());
        this.form.get('date')?.setValue(ctrlValue);
        datepicker.close();
    }

    cancel(): void {
        this.cancelForm.emit(true);
    }

    save(): void {
        const data = this.form.value;
        this.sendForm.emit(data);
    }

}
