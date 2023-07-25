import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedProducts } from '../shared/models/Product.model';
import { Observable } from 'rxjs';
import { Brand } from '../shared/models/brand.model';
import { Type } from '../shared/models/type.model';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  apiURL:string="http://localhost:5190/api/";
  constructor(private http: HttpClient) { }

  getProducts(brandId: number, typeId: number,sort:string,page:number,pageSize:number,searchstring:string): Observable<PaginatedProducts> {
    let params = new HttpParams()
    .set('brandId',brandId.toString())
    .set('typeId',typeId.toString())
    .set('sort',sort) 
    .set('page',page.toString())
    .set('searchstring',searchstring)
    .set('pageSize',pageSize.toString());
    return this.http.get<PaginatedProducts>(this.apiURL + 'Products/ProductByBrandandTypeID',{params:params});
  }
  getBrands():Observable<Brand[]>{
    return this.http.get<Brand[]>(this.apiURL+'Products/brand')
  }
  getTypes():Observable<Type[]>{
    return this.http.get<Type[]>(this.apiURL+'Products/type')
  }
}
