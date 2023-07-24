import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { Product } from '../shared/models/Product.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  Products:Product[]=[];

  constructor(private shopService:ShopService){}
  
  ngOnInit(): void {
    this.shopService.getProducts().subscribe({
      next: res =>{this.Products = res},
      error: error =>{console.log(error)},
      complete:() =>{console.log('Request Completed')}  
    });
  }

}
