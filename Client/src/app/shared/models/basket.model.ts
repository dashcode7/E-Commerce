import * as cuid from 'cuid'

export interface Basket {
    Id: string;
    items: BasketItem[];
  }
  
  export interface BasketItem {
    id: string;
    Name: string;
    Price: number;
    quantity: number;
    Pictureurl: string;
    BrandName: string;
    TypeName: string;
  }
  export class Basket implements Basket{
    Id = cuid();
    items: BasketItem[]=[];
  }