import { createReducer, on } from "@ngrx/store";
import { Book } from "./book";
import { UpdateBooksAPISuccess, booksFetchAPISuccess, deleteBooksAPISuccess, saveBookAPISuccess } from "./books.action";

export const initialState:ReadonlyArray<Book>=[]
   // {
    // "id": 1,
    // "title": "Harry Potter and the Philosopher's Stone",
    // "author": "J.K Rowling",
    // "cost": 300
//}
// ];

export const bookReducer = createReducer(
    initialState,
    // all books object as new state object
    on(booksFetchAPISuccess,(state: any,{allBooks}: any)=>{
        return allBooks
    }),
    on(saveBookAPISuccess,(state,{response})=>{
        // u can never manipulate the state data directly because its read only
        // but we can regenerate the new state
        let newState=[...state];
        newState.unshift(response);
        return newState
    }),
    // update
    on(UpdateBooksAPISuccess,(state,{response})=>{
        // initial data is being removing from existing data
        // and assighning to the new state
        let newState = state.filter(_=>_.id !== response.id);
        newState.unshift(response);
        return newState
    }),
    // delete 
    on(deleteBooksAPISuccess,(state,{id})=>{
        let newState = state.filter(_=>_.id !== id);
        return newState
    })
)