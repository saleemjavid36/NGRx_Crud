import { Component } from '@angular/core';
import { Book } from '../store/book';
import { Store, select } from '@ngrx/store';
import { selectBookById } from '../store/books.selector';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { invokeUpdateBookAPI } from '../store/books.action';
import { Appstate } from 'src/app/shared/store/appstate';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppStore } from 'src/app/shared/store/app.selector';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  constructor(
    private store:Store,
    private route:ActivatedRoute,
    private router:Router,
    private appStore:Store<Appstate>
  ){

  }

  // need id value from route
  ngOnInit(){
    let fetchFormDate$ = this.route.paramMap.pipe(
      switchMap((param) => {
        var id = Number(param.get('id'))
        return this.store.pipe(select(selectBookById(id)))
      })
    )
    fetchFormDate$.subscribe((data)=>{
      if(data){
        this.bookForm = {...data}
      }else{this.router.navigate(['/'])}
    })
    
  }
  
  bookForm:Book={
    id:0,
    author:'',
    title:'',
    cost:0
  }
  
  Update(){
    this.store.dispatch(invokeUpdateBookAPI({payload:{...this.bookForm}}))

    let appStatus$ = this.appStore.pipe(select(selectAppStore))
    appStatus$.subscribe((data)=>{
      if(data.apiStatus === 'success'){
        this.appStore.dispatch(setAPIStatus({apiStatus:{apiStatus:'',apiResponseMessage:''}}))
        this.router.navigate(['/']);
      }
    })
  }
}
