export interface Product{
  name: string
  price: number
  description: string
  pictureUrl: string
  productType: ProductType
  productTypeId: number
  productBrand: ProductBrand
  productBrandId: number
  id: number
}

export interface ProductType {
    name: string
    id: number
  }
  
  export interface ProductBrand {
    name: string
    id: number
  }