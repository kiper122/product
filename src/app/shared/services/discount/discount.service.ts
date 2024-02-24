import { Injectable } from '@angular/core';
import { IDiscountRequest, IDiscountResponse} from '../../interfaces/discount/discount.interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CollectionReference, DocumentData, Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private categoryCollection !: CollectionReference<DocumentData>;
  private url = environment.BACKEND_URL; 
  private api ={ discounts: `${this.url}/discounts`}

  constructor(
    private http:HttpClient,
    private afs:Firestore
    ) {
    this.categoryCollection = collection(this.afs,'discounts')
    }
  getAll():Observable<IDiscountResponse[]>{
    return this.http.get<IDiscountResponse[]>(this.api.discounts);
  }
  create(discount:IDiscountRequest):Observable<IDiscountResponse>{
    return this.http.post<IDiscountResponse>(this.api.discounts,discount);
  }
  delete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.api.discounts}/${id}`);
  }
  update(discount:IDiscountRequest,id:number):Observable<IDiscountResponse>{
    return this.http.patch<IDiscountResponse>(`${this.api.discounts}/${id}`,discount);
  }

  getOne(id:string|null):Observable<IDiscountResponse>{
    return this.http.get<IDiscountResponse>(`${this.api.discounts}/${id}`)
  } 
  //================================================================
  createFirebase(discount:IDiscountRequest){
    return addDoc(this.categoryCollection,discount);
  }
  getAllFarebase(){
    return collectionData(this.categoryCollection,{idField :'id'});
  }
  updateFirebase(discount:IDiscountRequest,id:string){
    const categoryDocumentReference = doc(this.afs,`discounts/${id}`);
    return updateDoc(categoryDocumentReference,{...discount});
  }
  deleteFirebase(id:string){
    const categoryDocumentReference = doc(this.afs,`discounts/${id}`);
    return deleteDoc(categoryDocumentReference);
  }
  getOneFirebase(id:string){
    const categoryDocumentReference = doc(this.afs,`discounts/${id}`);
    return docData(categoryDocumentReference,{idField:'id'});
  }
}
