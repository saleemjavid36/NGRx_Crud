import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BooksService } from "../books.service";
import { UpdateBooksAPISuccess, booksFetchAPISuccess, deleteBooksAPISuccess, invokeBooksAPI, invokeDeleteBookAPI, invokeSaveBookAPI, invokeUpdateBookAPI, saveBookAPISuccess } from "./books.action";
import { EMPTY, map, switchMap, withLatestFrom } from "rxjs";
import { Store, select } from "@ngrx/store";
import { Appstate } from "src/app/shared/store/appstate";
import { setAPIStatus } from "src/app/shared/store/app.action";
import { selectBooks } from "./books.selector";


@Injectable()
export class BooksEffects {
    constructor(
        private actions$:Actions,
        private bookService:BooksService,
        private appStore:Store<Appstate>,
        private store:Store
    ){}
    
    // read method
    
    // for this loadAllBOoksEffect i have registered
    // with invokeBooksAPI
    loadAllBooks$ = createEffect(()=>
    // this action can listen for the store action
    this.actions$.pipe(
        ofType(invokeBooksAPI),
        // this is used to reduce the unwanted
        //  selector invoke when we navigate to home component
        withLatestFrom(this.store.pipe(select(selectBooks))),
        switchMap(([,booksFromStore])=>{
            if(booksFromStore.length>0){
                return EMPTY;
            }
            //if api call gets succed have created One more
            // ACTION method wich is booksFetchAPiSuccess
            // this actin method will works with reducer for changing the state
            return this.bookService.get()
            .pipe(
                map((data)=>booksFetchAPISuccess({allBooks:data}))
                
            )
        })
    )
    )


    //Create method
    // we can even use mergMap or SwitchMap 
   saveNewBook$ = createEffect(()=>
        this.actions$.pipe(
            // we are listining action method
            ofType(invokeSaveBookAPI),
            // here action give payload mean input forms data (reading aciton method)
            switchMap((action)=>{
                this.appStore.dispatch(
                    setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:''}}))
                return this.bookService
                .create(action.payload)
                
                // .pipe(map((data)=> saveBookAPISuccess({response:data})))
                .pipe(map((data)=>{
                    this.appStore.dispatch(
                        setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:'success'}}))
                    return saveBookAPISuccess({response:data})
                 }))
            })
        )
   )


   // updateEffects

   updateBook$ = createEffect(()=>
        this.actions$.pipe(
            // we are listining action method
            ofType(invokeUpdateBookAPI),
            // here action give payload mean input forms data (reading aciton method)
            switchMap((action)=>{
                this.appStore.dispatch(
                    setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:''}}))
                return this.bookService
                .update(action.payload)
                
                // .pipe(map((data)=> saveBookAPISuccess({response:data})))
                .pipe(map((data)=>{
                    this.appStore.dispatch(
                        setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:'success'}}))
                    return UpdateBooksAPISuccess({response:data})
                 }))
            })
        )
   )


   // DeleteEffects

   delteBook$ = createEffect(()=>
        this.actions$.pipe(
            // we are listining action method
            ofType(invokeDeleteBookAPI),
            // here action give payload mean input forms data (reading aciton method)
            switchMap((action)=>{
                this.appStore.dispatch(
                    setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:''}}))
                return this.bookService
                .delete(action.id)
                
                // .pipe(map((data)=> saveBookAPISuccess({response:data})))
                .pipe(map((data)=>{
                    this.appStore.dispatch(
                        setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:'success'}}))
                    return deleteBooksAPISuccess({id:action.id})
                 }))
            })
        )
   )


}
