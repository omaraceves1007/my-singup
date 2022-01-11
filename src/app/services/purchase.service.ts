import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  url = environment.apiUrl;

  constructor( private http: HttpClient ) { }

  purchase(data: any): Observable<any> {
    return this.http.post( `${this.url}post`, data);
  }
}
