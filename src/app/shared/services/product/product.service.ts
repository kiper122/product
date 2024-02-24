import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProductRequest, IProductResponse } from '../../interfaces/product/product.interface';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CollectionReference, DocumentData, Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, query, updateDoc, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements Resolve<IProductResponse>{
  private categoryCollection !: CollectionReference<DocumentData>;
  private url = environment.BACKEND_URL;
  private api = {products:`${this.url}/products`};
  constructor(
    private http:HttpClient,
    private afs:Firestore
    ) { 
    this.categoryCollection = collection(this.afs,'product')
    }
  // getAll():Observable<IProductResponse[]>{
  //   return this.http.get<IProductResponse[]>(this.api.products);
  // }
  // create(discount:IProductRequest):Observable<IProductResponse>{
  //   return this.http.post<IProductResponse>(this.api.products,discount);
  // }
  // delete(id:string):Observable<void>{
  //   return this.http.delete<void>(`${this.api.products}/${id}`);
  // }
  // update(discount:IProductRequest,id:string):Observable<IProductResponse>{
  //   return this.http.patch<IProductResponse>(`${this.api.products}/${id}`,discount);
  // }
  // getOne(id:string):Observable<IProductResponse>{
  //   return this.http.get<IProductResponse>(`${this.api.products}/${id}`)
  // } 

  // getAllByCategory(categoryName:string):Observable<IProductResponse[]>{
  //   return this.http.get<IProductResponse[]>(`${this.api.products}?category.path=${categoryName}`);
  // }
  resolve(activatedRouteSnaphos:ActivatedRouteSnapshot){
    const categoryDocumentReference = doc(this.afs,`product/${activatedRouteSnaphos.paramMap.get('id')}`);
    return docData(categoryDocumentReference,{idField:'id'}) as any;
  }
  //============================================
  getAllFirebase(){
    return collectionData(this.categoryCollection,{idField :'id'});
  }
  createFirebase(product:IProductRequest){
    return addDoc(this.categoryCollection,product);
  }
  deleteFirebase(id:string){
    const categoryDocumentReference = doc(this.afs,`product/${id}`);
    return deleteDoc(categoryDocumentReference);
  }
  updateFirebase(product:IProductRequest,id:string){
    const categoryDocumentReference = doc(this.afs,`product/${id}`);
    return updateDoc(categoryDocumentReference,{...product});
  }
  getAllByCategoryFirebase(categoryName:string){
    const categoryQuery = query(
      collection(this.afs, 'product'),
      where('category.path', '==', categoryName)
    );
    return collectionData(categoryQuery, { idField: 'id' });
  }
  getOneFirebase(id:string){
    const categoryDocumentReference = doc(this.afs,`product/${id}`);
    return docData(categoryDocumentReference,{idField:'id'});
  } 
}
