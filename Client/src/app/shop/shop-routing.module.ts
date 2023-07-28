import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ShopComponent } from './shop.component';

const routes:Routes=[
  {path:'',component:ShopComponent},
  {path:':id',component:ProductInfoComponent,data:{breadcrumb:{'alias':'productdetails'}}},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class ShopRoutingModule { }
