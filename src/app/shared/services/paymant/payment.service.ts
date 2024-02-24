import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPaymentRequest, IPaymentResponse } from '../../interfaces/payment/payment.interface';
import { CollectionReference, DocumentData, Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private categoryCollection !: CollectionReference<DocumentData>;
  private url = environment.BACKEND_URL; 
  private api ={ payment: `${this.url}/payment`}

  constructor(
    private http:HttpClient,
    private afs:Firestore
    ) {
    this.categoryCollection = collection(this.afs,'payment')
    }
  getAll():Observable<IPaymentResponse[]>{
    return this.http.get<IPaymentResponse[]>(this.api.payment);
  }
  create(discount:IPaymentRequest):Observable<IPaymentResponse>{
    return this.http.post<IPaymentResponse>(this.api.payment,discount);
  }
  delete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.api.payment}/${id}`);
  }
  update(discount:IPaymentRequest,id:number):Observable<IPaymentResponse>{
    return this.http.patch<IPaymentResponse>(`${this.api.payment}/${id}`,discount);
  }
  getOne(id:string|null):Observable<IPaymentResponse>{
    return this.http.get<IPaymentResponse>(`${this.api.payment}/${id}`)
  } 

  //===========================================


  createFirebase(payment:IPaymentRequest){
    return addDoc(this.categoryCollection,payment);
  }
  getAllFarebase(){
    return collectionData(this.categoryCollection,{idField :'id'});
  }
  updateFirebase(payment:IPaymentRequest,id:string){
    const categoryDocumentReference = doc(this.afs,`payment/${id}`);
    return updateDoc(categoryDocumentReference,{...payment});
  }
  deleteFirebase(id:string){
    const categoryDocumentReference = doc(this.afs,`payment/${id}`);
    return deleteDoc(categoryDocumentReference);
  }
}
