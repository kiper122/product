// export interface IDiscount{
//     description:string;
//     imagePath:string;
//     nameDiscount:string;
//     id:number;
// }

//==========================================================//
export interface IDiscountRequest{
    description:string;
    imagePath:string;
    nameDiscount:string;
}
export interface IDiscountResponse extends IDiscountRequest{
    id:string;
}