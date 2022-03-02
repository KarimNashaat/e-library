import { createSelector } from 'reselect'

export const booksSelector = store => store.books.books
export const booksCountSelector = store => store.books.booksCount

export const bookByIdSelector = (bookId) => createSelector(booksSelector, books =>
    books.find(book => book.id == bookId))

export const notBorrowedBooksSelector = createSelector(booksSelector, books => books.filter(book => book.status == 0))
export const bookHistorySelector = store => store.books.bookHistory.reverse()