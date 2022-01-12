import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  templateUrl: './response-snack.component.html',
})
export class ResponseSnackComponent implements OnInit {

  info: any;

  // constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data)
    this.info = data;
  }

  ngOnInit(): void {
  }

}
