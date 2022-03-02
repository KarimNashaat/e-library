import { booksActionTypes } from "../../books/actions"

const initState = {
    fetchingBooks: false,
    addingBook: false,
    deletingBook: false,
    borrowingBook: false,
    fetchingBookHistory: false,
    returningBook: false
}

export const booksLoadersReducer = (state = initState, action) => {
    switch (action.type) {
        case booksActionTypes.FETCH_BOOKS:
            return { ...state, fetchingBooks: true }
        case booksActionTypes.FETCH_BOOKS_SUCCESS:
        case booksActionTypes.FETCH_BOOKS_FAIL:
            return { ...state, fetchingBooks: false }

        case booksActionTypes.ADD_NEW_BOOK:
            return { ...state, addingBook: true }
        case booksActionTypes.ADD_NEW_BOOK_SUCCESS:
        case booksActionTypes.ADD_NEW_BOOK_FAIL:
            return { ...state, addingBook: false }

        case booksActionTypes.DELETE_BOOK:
            return { ...state, deletingBook: true }
        case booksActionTypes.DELETE_BOOK_SUCCESS:
        case booksActionTypes.DELETE_BOOK_FAIL:
            return { ...state, deletingBook: false }

        case booksActionTypes.BORROW_BOOK:
            return { ...state, borrowingBook: true }
        case booksActionTypes.BORROW_BOOK_SUCCESS:
        case booksActionTypes.BORROW_BOOK_FAIL:
            return { ...state, borrowingBook: false }

        case booksActionTypes.GET_BOOK_HISTORY:
            return { ...state, fetchingBookHistory: true }
        case booksActionTypes.GET_BOOK_HISTORY_SUCCESS:
        case booksActionTypes.GET_BOOK_HISTORY_FAIL:
            return { ...state, fetchingBookHistory: false }

        case booksActionTypes.RETURN_BOOK:
            return { ...state, returningBook: true }
        case booksActionTypes.RETURN_BOOK_SUCCESS:
        case booksActionTypes.RETURN_BOOK_FAIL:
            return { ...state, returningBook: false }
        default:
            return state
    }
}