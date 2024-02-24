
//==========================================================//
export interface IPaymentRequest{
    description:string;
    imagePath:string;
    nameIPayment:string;
}
export interface IPaymentResponse extends IPaymentRequest{
    id:string;
}