import { Brand } from "./brand.model";
import { Type } from "./type.model";

export class PaginatedProducts{
  pageSize:number =6;
  totalCount:number=0;
  pageNumber:number=1;
  data:Product[]=[]
}

export interface Product{
  name: string
  price: number
  description: string
  pictureUrl: string
  productType: Type
  productTypeId: number
  productBrand: Brand
  productBrandId: number
  id: number
}

