import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IProduct } from '../../models/product';

type ItemList = { name: string, quantity: number, price: number};

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnChanges {

    @Input() data: IProduct[] = [];
    @Output() sendTotal = new EventEmitter<any>();
    list: ItemList[] = []
    
    constructor() { }
    
    ngOnInit(): void {
    }
    
    ngOnChanges(changes: SimpleChanges): void {
        this.setList();
    }

    setList(): void {
        this.list = [];
        if( this.data.length > 0 ){
            this.data.forEach( prod => {
                if( prod.selected ) {
                    this.list.push({
                        name: prod.name,
                        quantity: prod.quantity,
                        price: prod.price
                    });
                }        
            });
        }
    }

    getPrice(item: ItemList): string {
        const finalPrice = item.quantity  * item.price;
        return finalPrice.toString();
    }

    getTotal(): string {
        let total = 0;
        this.list.forEach( item => {
            total = total + (item.quantity  * item.price);
        });
        this.sendTotal.emit(total);
        return total.toString();
    }

}
