import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategoryRequest, ICategoryResponce } from '../../interfaces/category/category.interfaces';
import { CollectionReference, DocumentData, Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = environment.BACKEND_URL;
  private api = {categories:`${this.url}/categories`};
  private categoryCollection !: CollectionReference<DocumentData>;
  constructor(
    private http:HttpClient,
    private afs:Firestore
    ) { 
    this.categoryCollection = collection(this.afs,'category')
    }


  // getAll():Observable<ICategoryResponce[]>{
  //   return this.http.get<ICategoryResponce[]>(this.api.categories);
  // }
  // create(category:ICategoryRequest):Observable<ICategoryResponce>{
  //   return this.http.post<ICategoryResponce>(this.api.categories,category);
  // }
  // update(category:ICategoryRequest,id:string):Observable<ICategoryResponce>{
  //   return this.http.patch<ICategoryResponce>(`${this.api.categories}/${id}`,category);
  // }
  // delete(id:string):Observable<void>{
  //   return this.http.delete<void>(`${this.api.categories}/${id}`);
  // }
  //================================================================

  createFirebase(category:ICategoryRequest){
    return addDoc(this.categoryCollection,category);
  }
  getAllFarebase(){
    return collectionData(this.categoryCollection,{idField :'id'});
  }
  updateFirebase(category:ICategoryRequest,id:string){
    const categoryDocumentReference = doc(this.afs,`category/${id}`);
    return updateDoc(categoryDocumentReference,{...category});
  }
  deleteFirebase(id:string){
    const categoryDocumentReference = doc(this.afs,`category/${id}`);
    return deleteDoc(categoryDocumentReference);
  }

  
  
}
