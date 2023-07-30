import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Basket, BasketItem } from '../shared/models/basket.model';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  apiURL:string="http://localhost:5190/api/";
  basket= new  BehaviorSubject<Basket | null>(null);
  
  
  constructor(private http: HttpClient) { }

  getBasket(id:string){
    return this.http.get<Basket>(this.apiURL+'Bucket/GetBucket&id='+ id).subscribe({
      next:basket =>{this.basket.next(basket)}
    })
  }

  setBasket(basket:Basket){
    return this.http.post<Basket>(this.apiURL+'Bucket/UpdateBucket',basket).subscribe({
      next:basket =>{this.basket.next(basket)}
    })
  }

  UpdateBasket(item:Product,quantity:number =1){
    const basket = this.mapProduct_to_Basket(item);
    const itemToAdd = this.getCurrentBasket() ?? new Basket();
    itemToAdd.items = this.AddorUpdateBasket(itemToAdd.items,basket,quantity);
    this.setBasket(itemToAdd)

  }
  private AddorUpdateBasket(baskets:BasketItem[],item:BasketItem,quantity:number){
    const exists = baskets.find( x => x.id === item.id );
    if(exists){
      exists.quantity += quantity;
    }
    else{
      item.quantity = quantity;
      baskets.push(item);
    }
    return baskets;
  }
  private getCurrentBasket(){
    return this.basket.value;
  }
  private mapProduct_to_Basket(product:Product):BasketItem{
    return {
      id:product.id.toString(),
      Name:product.name,
      Pictureurl:product.pictureUrl,
      Price:product.price,
      quantity:0,
      BrandName:product.productBrand.name,
      TypeName:product.productType.name
    }
  }
}
