import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectBooks } from '../store/books.selector';
import { invokeBooksAPI, invokeDeleteBookAPI } from '../store/books.action';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppStore } from 'src/app/shared/store/app.selector';
import { Router } from '@angular/router';
import { Appstate } from 'src/app/shared/store/appstate';

declare var window:any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private store:Store,  private appStore:Store<Appstate>,
    private router:Router){

  }

  books$= this.store.pipe(
    select(selectBooks)
  )

  deleteModal:any;
  idToDelete:number=0

  ngOnInit(){
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById("deleteModal")
    )
    this.store.dispatch(invokeBooksAPI())
  }
  
  openDeleteModal(id:number){
    this.idToDelete=id;
    this.deleteModal.show();
  }

  confirmDelete(){
    this.store.dispatch(invokeDeleteBookAPI({id:this.idToDelete}));
    
    let appStatus$ = this.appStore.pipe(select(selectAppStore))
    appStatus$.subscribe((data)=>{
      if(data.apiStatus === 'success'){
        this.appStore.dispatch(setAPIStatus({apiStatus:{apiStatus:'',apiResponseMessage:''}}))
        this.deleteModal.hide()
      }
    })
  }

}
