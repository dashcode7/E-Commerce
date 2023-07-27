import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { PaginatedProducts, Product } from '../shared/models/Product.model';
import { Type } from '../shared/models/type.model';
import { Brand } from '../shared/models/brand.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  Products:Product[]=[];
  Brands:Brand[]=[];
  Types:Type[]=[];
  brandIdSelected:number=0;
  typeIdSelected:number=0;
  sortOptSelected:string='name';
  sortOptions=[
  {name:"Alphabetical",value:'name'},
  {name:"Price : Low to High",value:'priceASC'},
  {name:"Price : High to Low",value:'priceDSC'}

]
paginatedList:PaginatedProducts = new PaginatedProducts();
searchString='';



  constructor(private shopService:ShopService){}
  
  ngOnInit(): void {
    this.getProducts()
    this.getBrands();
    this.getTypes();
  }
  getProducts(){
    this.shopService.getProducts(this.brandIdSelected,this.typeIdSelected,this.sortOptSelected,this.paginatedList.pageNumber,this.paginatedList.pageSize,this.searchString).subscribe({
      next: res =>{
        this.Products = res.data;
        this.paginatedList.pageNumber = res.pageNumber;
        this.paginatedList.totalCount = res.totalCount;
        this.paginatedList.pageSize = res.pageSize
      
      },
      error: error =>{console.log(error)},
      complete:() =>{console.log('Request Completed')}  
    });
  }
  getBrands(){
    this.shopService.getBrands().subscribe({
      next: resp =>{this.Brands = [{id:0,name:'All'},...resp]},
      error:err =>{console.log(err)},
      complete:()=>{console.log("Request Completed")}

    })
  }
  getTypes(){
    this.shopService.getTypes().subscribe({
      next: resp =>{this.Types = [{id:0,name:'All'},...resp]},
      error:err =>{console.log(err)},
      complete:()=>{console.log("Request Completed")}

    })
  }
  brandSelected(id:number){
    this.brandIdSelected = id;
    this.paginatedList.pageNumber=1;
    this.getProducts();
  }
  typeSelected(id:number){
  this.typeIdSelected =id;
  this.paginatedList.pageNumber=1;
  this.getProducts();

  }
  onSortItems(event:any){
    this.sortOptSelected = event.target.value;
    this.getProducts();
  }
  changePage(event:any){
    this.paginatedList.pageNumber = event.page;
    this.getProducts();

  }
  

}
