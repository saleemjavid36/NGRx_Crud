import { createAction, props } from "@ngrx/store";
import { Book } from "./book";

export const invokeBooksAPI = createAction(
    // "[source] type of the event"
    "[Books API] invoke books Fetch API"
)

export const booksFetchAPISuccess = createAction(
    // "[source] type of the event"
    "[Books API] books fetch api success",
    props<{allBooks:Book[]}>()
)

export const invokeSaveBookAPI= createAction(
    "[Books API] invoke save book API",
    props<{payload:Book}>()
)

export const saveBookAPISuccess= createAction(
    "[Books API]  save book API success",
    props<{response:Book}>()
)

// udpate action

export const invokeUpdateBookAPI=createAction(
    '[Books API] invoke update book API',
    props<{payload:Book}>()
)

export const UpdateBooksAPISuccess= createAction(
    '[Books API]  update Book API Success',
    props<{response:Book}>()

)
// Delete action

export const invokeDeleteBookAPI=createAction(
    '[Books API] invoke delete book API',
    props<{id:number}>()
)

export const deleteBooksAPISuccess= createAction(
    '[Books API]  delete Book API Success',
    props<{id:number}>()

)