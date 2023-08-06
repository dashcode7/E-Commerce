import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/Product.model';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
import { take } from 'rxjs';
import { BasketItem } from 'src/app/shared/models/basket.model';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

  product!:Product;
  quantity:number =1;
  quantityInBasket:number =0;

  constructor(private shopService:ShopService,
    private activatedRoute:ActivatedRoute,
    private bread:BreadcrumbService,
    private basketService:BasketService)
  {
    this.bread.set('@productdetails',' ');

  }

  ngOnInit() {
    this.getProductInfo();
  }
  getProductInfo(){
    const id = this.activatedRoute.snapshot.params['id'];
    this.shopService.getProductById(+id).subscribe({
      next: res =>{
        this.product =res
        this.bread.set('@productdetails',this.product.name);
        this.basketService.basket$.pipe(take(1)).subscribe(x =>{
          let filteredItems = x?.items.find(item => item.id === this.product.id);
          if(filteredItems){
            this.quantity = filteredItems.quantity;
            this.quantityInBasket= filteredItems.quantity;
          }
        })
      },
      error: err=>{ console.log(err)}
    })

  }
  DecreaseQuantity(){
    this.quantity = this.quantity ==  0 ? 0 : (this.quantity-1) ;
  }
  IncreaseQuantity(){
    this.quantity += 1;
  }
  addProductToBasket(){
    if(this.quantity < this.quantityInBasket){
      let count = this.quantityInBasket - this.quantity;
      this.quantityInBasket -= count;
      this.basketService.removeItemFromBasket(this.product.id,count)
    }
    else if(this.quantity > this.quantityInBasket){
      let count = this.quantity - this.quantityInBasket;
      this.quantityInBasket += count;
      this.basketService.UpdateBasket(this.product,count)
    }
    else{
      return;
    }
  }
  get buttonText(){
    return this.quantityInBasket === 0 ? "Add to cart" :"Update cart";
  }
  
}
