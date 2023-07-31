import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Basket, BasketCost, BasketItem } from '../shared/models/basket.model';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  apiURL:string="http://localhost:5190/api/";
  private basket= new  BehaviorSubject<Basket | null>(null);
  private basketTotal = new BehaviorSubject<BasketCost | null>(null);
  basket$ = this.basket.asObservable();
  basketTotal$ = this.basketTotal.asObservable();

  
  
  constructor(private http: HttpClient) { }

  getBasket(id:string){
    return this.http.get<Basket>(this.apiURL+'Bucket/GetBucket?id='+ id).subscribe({
      next:basket =>{
        this.basket.next(basket);
        this.calculateTotalCount();
      }
    })
  }

  setBasket(basket:Basket){
    return this.http.post<Basket>(this.apiURL+'Bucket/UpdateBucket',basket).subscribe({
      next:basket =>{
        this.basket.next(basket);
        this.calculateTotalCount();
        localStorage.setItem('basket_id',basket.id)
      }
    })
  }

  UpdateBasket(item:Product | BasketItem,quantity:number =1){
    if(this.isProduct(item)) item =  this.mapProduct_to_Basket(item);
    const itemToAdd = this.getCurrentBasket() ?? new Basket();
    itemToAdd.items = this.AddorUpdateBasket(itemToAdd.items,item,quantity);
    this.setBasket(itemToAdd)

  }
  removeItemFromBasket(id:number,quantity:number=1){
    const basket = this.getCurrentBasket();
    if(! basket) return;
    const item = basket.items.find(x => x.id == id);
    if(item){
      item.quantity -= quantity;
      if(item.quantity == 0){
        basket.items = basket.items.filter(x => x.id != id);
      }
      if(basket.items.length > 0){
        this.setBasket(basket);
      }
      else{
        this.deleteBasket(basket.id);
      }

    }
  }
  private deleteBasket(id:string){
    this.http.delete(this.apiURL+"Bucket/DeleteBucket?id="+id).subscribe({
      next:()=>{
        this.calculateTotalCount();
        this.basket.next(null);
        this.basketTotal.next(null);
        localStorage.removeItem('basket_id');
      }
    })
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
      id:product.id,
      name:product.name,
      pictureurl:product.pictureUrl,
      price:product.price,
      quantity:0,
      brandName:product.productBrand.name,
      typeName:product.productType.name
    }
  }
  private calculateTotalCount(){
    const basket = this.getCurrentBasket();
    if (!basket) return;
    else {
      const shipping = 0;
      const subtotal = basket.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      this.basketTotal.next({
        shipping: 0,
        subTotal: subtotal,
        total: shipping + subtotal
      });
    }
  }
  private isProduct(item:Product | BasketItem):item is Product{
    return (item as Product).productBrand !== undefined;
  }
}
