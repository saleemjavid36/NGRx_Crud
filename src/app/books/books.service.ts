import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Book } from './store/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http:HttpClient) { }

  get(){
    return this.http.get<Book[]>("http://localhost:3000/books")
  }

  // create Mehtod
  create(payload:Book){
    return this.http.post<Book>("http://localhost:3000/books",payload)
  }

  // update method
  update(payload:Book){
    return this.http.put<Book>(`http://localhost:3000/books/${payload.id}`,payload)
  }

  // delte method

  delete(id:number){
    return this.http.delete(`http://localhost:3000/books/${id}`)
  }
}
