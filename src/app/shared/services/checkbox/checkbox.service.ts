import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOrderReques, IOrderResponse } from '../../interfaces/orders/order.interfaces';
import { CollectionReference, DocumentData, Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CheckboxService {
  private categoryCollection !: CollectionReference<DocumentData>;
  private url = environment.BACKEND_URL;
  private api = {orders:`${this.url}/orders`};
  constructor(
    private http:HttpClient,
    private afs:Firestore
    ) { 
    this.categoryCollection = collection(this.afs,'orders')
    }
  
  getAll():Observable<IOrderResponse[]>{
    return this.http.get<IOrderResponse[]>(this.api.orders);
  }
  create(discount:IOrderReques):Observable<IOrderResponse>{
    return this.http.post<IOrderResponse>(this.api.orders,discount);
  }
  delete(id:string):Observable<void>{
    return this.http.delete<void>(`${this.api.orders}/${id}`);
  }
  update(discount:IOrderReques,id:string):Observable<IOrderResponse>{
    return this.http.patch<IOrderResponse>(`${this.api.orders}/${id}`,discount);
  }
  //===============================================

  createFirebase(orders:IOrderReques){
    return addDoc(this.categoryCollection,orders);
  }
  getAllFarebase(){
    return collectionData(this.categoryCollection,{idField :'id'});
  }
  updateFirebase(orders:IOrderReques,id:string){
    const categoryDocumentReference = doc(this.afs,`orders/${id}`);
    return updateDoc(categoryDocumentReference,{...orders});
  }
  deleteFirebase(id:string){
    const categoryDocumentReference = doc(this.afs,`orders/${id}`);
    return deleteDoc(categoryDocumentReference);
  }

}
