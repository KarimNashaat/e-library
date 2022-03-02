export const fetchingStudentsSelector = store => store.loaders.studentsLoaders.fetchingStudents
export const addingStudentSelector = store => store.loaders.studentsLoaders.addingStudent
export const deletingStudentSelector = store => store.loaders.studentsLoaders.deletingStudent
export const fetchingStudentHistorySelector = store => store.loaders.studentsLoaders.fetchingStudentHistory

export const fetchingBooksSelector = store => store.loaders.booksLoaders.fetchingBooks
export const addingBookSelector = store => store.loaders.booksLoaders.addingBook
export const deletingBookSelector = store => store.loaders.booksLoaders.deletingBook
export const borrowingBookSelector = store => store.loaders.booksLoaders.borrowingBook
export const fetchingBookHistorySelector = store => store.loaders.booksLoaders.fetchingBookHistory
export const returningBookSelector = store => store.loaders.booksLoaders.returningBook