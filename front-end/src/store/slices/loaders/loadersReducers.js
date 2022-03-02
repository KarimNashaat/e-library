import { combineReducers } from 'redux';
import { booksLoadersReducer } from './reducers/booksLoadersReducer';
import { studentsLoadersReducer } from './reducers/studentsLoadersReducer';

export const loadersRootReducer = combineReducers({
    studentsLoaders: studentsLoadersReducer,
    booksLoaders: booksLoadersReducer
})