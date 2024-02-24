import { IProductResponse } from "../product/product.interface"

export interface IOrderReques{
    name: string,
    phoneNumbers:string,
    Citi:string,
    Street:string,
    numbersHome:string,
    Entrance:string,
    Floot:string,
    Entryphone:string,
    kv:string
    products:IProductResponse[],
    total:number
}
export interface IOrderResponse extends IOrderReques{
    id:string
}