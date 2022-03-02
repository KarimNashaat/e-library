import axios from '../../../axios'
import { toaster } from '../../middlewares/toasterMiddleware/toasterFactory';
import { toasterType } from '../../middlewares/toasterMiddleware/toasterTypes';

export const booksActionTypes = {
    FETCH_BOOKS: "FETCH_BOOKS",
    FETCH_BOOKS_SUCCESS: "FETCH_BOOKS_SUCCESS",
    FETCH_BOOKS_FAIL: "FETCH_BOOKS_FAIL",

    ADD_NEW_BOOK: "ADD_NEW_BOOK",
    ADD_NEW_BOOK_SUCCESS: "ADD_NEW_BOOK_SUCCESS",
    ADD_NEW_BOOK_FAIL: "ADD_NEW_BOOK_FAIL",

    DELETE_BOOK: "DELETE_BOOK",
    DELETE_BOOK_SUCCESS: "DELETE_BOOK_SUCCESS",
    DELETE_BOOK_FAIL: "DELETE_BOOK_FAIL",


    BORROW_BOOK: "BORROW_BOOK",
    BORROW_BOOK_SUCCESS: "BORROW_BOOK_SUCCESS",
    BORROW_BOOK_FAIL: "BORROW_BOOK_FAIL",

    GET_BOOK_HISTORY: "GET_BOOK_HISTORY",
    GET_BOOK_HISTORY_SUCCESS: "GET_BOOK_HISTORY_SUCCESS",
    GET_BOOK_HISTORY_FAIL: "GET_BOOK_HISTORY_FAIL",

    RETURN_BOOK: "RETURN_BOOK",
    RETURN_BOOK_SUCCESS: "RETURN_BOOK_SUCCESS",
    RETURN_BOOK_FAIL: "RETURN_BOOK_FAIL"
}

export const fetchBooks = (itemCount, pageNum) => async dispatch => {
    dispatch({
        type: booksActionTypes.FETCH_BOOKS
    })

    axios.get(`/getBooks/${itemCount}/${pageNum}`)
        .then(res => {
            console.log("Fetch Books: ", res)
            dispatch(fetchBooksSuccess(res.data))
        })
        .catch(error => {
            console.log(error)
            dispatch(fetchBooksFail)
        })
}

export const fetchBooksSuccess = (books) => {
    return {
        type: booksActionTypes.FETCH_BOOKS_SUCCESS,
        payload: books
    }
}

export const fetchBooksFail = (error) => {
    return {
        type: booksActionTypes.FETCH_BOOKS_FAIL,
        meta: {
            ...toaster(toasterType.error, 'Failed to fetch books', error),
        },
    }
}

export const addNewbook = ({ title, description }, onSuccess) => async dispatch => {
    dispatch({
        type: booksActionTypes.ADD_NEW_BOOK
    })

    const body = { title, description }
    axios.post("/addNewBook", body)
        .then(res => {
            dispatch(addNewbookSuccess(res.data))
            onSuccess()
        })
        .catch(error => {
            console.log("Add New Book Error: ", error)
            dispatch(addNewbookFail(error))
        })
}

export const addNewbookSuccess = (book) => {
    return {
        type: booksActionTypes.ADD_NEW_BOOK_SUCCESS,
        payload: book,
        meta: {
            ...toaster(toasterType.success, 'New Book Added Successfully!'),
        },
    }
}

export const addNewbookFail = (error) => {
    return {
        type: booksActionTypes.ADD_NEW_BOOK_FAIL,
        meta: {
            ...toaster(toasterType.error, 'Failed to add book', error),
        },
    }
}

export const deletebook = (bookId, onSucces) => async dispatch => {
    dispatch({
        type: booksActionTypes.DELETE_BOOK
    })
    const body = { bookId }
    axios.post("/deleteBook", body)
        .then(res => {
            dispatch(deletebookSuccess(bookId))
            onSucces()
        })
        .catch(error => {
            console.log("Delete Book Error: ", error)
            dispatch(deletebookFail(error))
        })
}

export const deletebookSuccess = (bookId) => {
    return {
        type: booksActionTypes.DELETE_BOOK_SUCCESS,
        payload: bookId,
        meta: {
            ...toaster(toasterType.success, 'Book Deleted Successfully!'),
        },

    }
}

export const deletebookFail = (error) => {
    return {
        type: booksActionTypes.DELETE_BOOK_FAIL,
        meta: {
            ...toaster(toasterType.error, 'Failed to delete book', error),
        },
    }
}


export const borrowBook = (student, book, returningDate, borrowingDate, onSucces) => async dispatch => {
    dispatch({
        type: booksActionTypes.BORROW_BOOK
    })

    const body = {
        studentId: student.id,
        studentName: student.name,
        bookId: book.id,
        bookTitle: book.title,
        returningDate,
        borrowingDate
    }
    axios.post('/borrowBook', body)
        .then(res => {
            console.log(res)
            dispatch({
                type: booksActionTypes.BORROW_BOOK_SUCCESS,
                payload: book.id
            })
            onSucces(body)
        })
        .catch(error => {
            dispatch({
                type: booksActionTypes.BORROW_BOOK_FAIL,
                meta: {
                    ...toaster(toasterType.error, 'Failed to borrow the book', error.response.data.message),
                },
            })
        })
}


export const getBookHistory = bookId => async dispatch => {
    dispatch({
        type: booksActionTypes.GET_BOOK_HISTORY
    })
    const body = { bookId }
    axios.post('/getBookHistory', body)
        .then(res => {
            console.log(res)
            dispatch({
                type: booksActionTypes.GET_BOOK_HISTORY_SUCCESS,
                payload: res.data
            })
        })
        .catch(error => {
            dispatch({
                type: booksActionTypes.GET_BOOK_HISTORY_FAIL,
                meta: {
                    ...toaster(toasterType.error, 'Failed to fetch book history', error.response.data.message),
                },
            })
        })
}

export const returnBook = (borrowingId, returnedOnDate, bookId) => async dispatch => {
    dispatch({
        type: booksActionTypes.RETURN_BOOK
    })

    const body = {
        borrowingId,
        bookId,
        returnedOnDate
    }
    axios.post('/returnBook', body)
        .then(res => {
            dispatch({
                type: booksActionTypes.RETURN_BOOK_SUCCESS,
                payload: body
            })
        })
        .catch(error => {
            dispatch({
                type: booksActionTypes.RETURN_BOOK_FAIL,
                meta: {
                    ...toaster(toasterType.error, 'Failed to return book', error.response.data.message),
                },
            })
        })
}