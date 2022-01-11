import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IProduct } from '../../models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() data: IProduct | null = null;
  public show = false;

  public form = this.fb.group({
    checked: ['', []],
    quantity: ['0', [Validators.required, Validators.max(50), Validators.min(1)]]
  });

  @Output() sendForm = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form.controls['quantity'].markAsTouched();
  }

  showHide(event: boolean): void {
    this.show = event;
  }

  sendData(): void {
    const formData = {
      id: this.data?.id,
      form: this.form
    };
    this.sendForm.emit(formData);
  }


  getErrorMsg(): string {
    if (this.form.controls['quantity'].errors) {
      return 'min' in this.form.controls['quantity'].errors ? 'Min value 1, please enter a higher value ' : ' Max value 50, please enter a smaller value'
    }
    return '';
  }

}
