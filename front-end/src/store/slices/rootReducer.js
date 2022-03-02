import { combineReducers } from 'redux';
import { booksReducer } from './books/reducer';
import { loadersRootReducer } from './loaders/loadersReducers';
import { studentsReducer } from './students/reducer';

export const rootReducer = combineReducers({
    students: studentsReducer,
    books: booksReducer,
    loaders: loadersRootReducer
})