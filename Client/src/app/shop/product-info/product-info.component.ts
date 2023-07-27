import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/Product.model';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

  product!:Product;

  constructor(private shopService:ShopService,private activatedRoute:ActivatedRoute){}

  ngOnInit() {
    this.getProductInfo();
  }
  getProductInfo(){
    const id = this.activatedRoute.snapshot.params['id'];
    this.shopService.getProductById(+id).subscribe({
      next: res =>{this.product =res},
      error: err=>{ console.log(err)}
    })

  }

}
