import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Book } from "./book";


// we are reducing it as my book it will will be used in module
export const selectBooks = createFeatureSelector<Book[]>("myBook")


// update mehtod
export const selectBookById =(bookId:number)=>{
    return createSelector(
        selectBooks,
        (books:Book[])=>{
            var bookById = books.filter(_=>_.id==bookId);
            if(bookById.length== 0){
                return null
            }
            return bookById[0]
        }
    )
}