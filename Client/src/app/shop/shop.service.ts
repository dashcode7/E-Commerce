import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../shared/models/Product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  apiURL:string="http://localhost:5190/api/";
  constructor(private http: HttpClient) { }

  getProducts():Observable<Product[]>{
return this.http.get<Product[]>(this.apiURL+'Products');
  }
}
