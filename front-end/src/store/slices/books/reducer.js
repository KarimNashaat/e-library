import { booksActionTypes } from './actions'

const initState = {
    books: [],
    bookHistory: [],
    booksCount: 0
}

export const booksReducer = (state = initState, action) => {
    switch (action.type) {
        case booksActionTypes.FETCH_BOOKS_SUCCESS:
            return {
                ...state,
                books: action.payload.books,
                booksCount: action.payload.count
            }
        case booksActionTypes.ADD_NEW_BOOK_SUCCESS:
            return {
                ...state,
                books: [
                    ...state.books,
                    action.payload
                ]
            }
        case booksActionTypes.DELETE_BOOK_SUCCESS:
            return {
                ...state,
                books: state.books.filter(book => book.id !== action.payload)
            }
        case booksActionTypes.BORROW_BOOK_SUCCESS:
            return {
                ...state,
                books: state.books.map(book => {
                    if (book.id == action.payload) {
                        book.status = 1
                    }
                    return book
                })
            }
        case booksActionTypes.GET_BOOK_HISTORY_SUCCESS:
            return {
                ...state,
                bookHistory: action.payload.reverse()
            }
        case booksActionTypes.RETURN_BOOK_SUCCESS:
            return {
                ...state,
                books: state.books.map(book => {
                    if (book.id == action.payload.bookId) {
                        book.status = 0
                    }
                    return book
                })
            }
        default:
            return state;
    }
}