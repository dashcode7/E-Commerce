import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/Product.model';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

  product!:Product;

  constructor(private shopService:ShopService,private activatedRoute:ActivatedRoute,private bread:BreadcrumbService)
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
        this.bread.set('@productdetails',this.product.name)
      },
      error: err=>{ console.log(err)}
    })

  }
  
}
