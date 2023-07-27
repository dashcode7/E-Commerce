import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { SharedModule } from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import { ProductInfoComponent } from './product-info/product-info.component'
import { ShopRoutingModule } from './shop-routing.module';


@NgModule({
  declarations: [
    ShopComponent,
    ProductItemComponent,
    ProductInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ShopRoutingModule
  ],
  exports:[
    ShopComponent
  ]
})
export class ShopModule { }
