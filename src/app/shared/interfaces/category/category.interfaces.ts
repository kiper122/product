
export interface ICategoryRequest{
    name:string,
    path:string,
    imagePath:string,
    dopCategory:boolean,
    productDopForCategory:string,
    smakue:string
}

export interface ICategoryResponce extends ICategoryRequest{
    id:string
}
