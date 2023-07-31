import * as cuid from 'cuid'

export interface Basket {
    id: string;
    items: BasketItem[];
  }
  
  export interface BasketItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    pictureurl: string;
    brandName: string;
    typeName: string;
  }
  export interface BasketCost{
    shipping:number,
    subTotal:number,
    total:number
  }
  export class Basket implements Basket{
    id = cuid();
    items: BasketItem[]=[];
  }