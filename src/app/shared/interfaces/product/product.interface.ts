import { ICategoryResponce } from "../category/category.interfaces"

export interface IProductRequest{
    category:ICategoryResponce,//+
    name:string,//+
    path:string,//+
    description:string,//+
    weight:string,//вага
    price:number,//+
    size:string,//+
    imagePath:string,//+
    proteins:number,//білки +
    carbohydrates:number,//вуглеводи +
    fat:number,//жири +
    calories:number//калорійність +
    count:number,
    discount:number,
}
export interface IProductResponse extends IProductRequest{
    id:string
}

