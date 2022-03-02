import { createSelector } from 'reselect'

export const studentsSelector = store => store.students.students
export const studentByIdSelector = (studentId) => createSelector(studentsSelector, students =>
    students.find(student => student.id == studentId))
export const studentHistorySelector = store => store.students.studentHistory.reverse()

export const noReturnedBooksCountSelector = createSelector(studentHistorySelector, allStudentBooks => 
    allStudentBooks.filter(book => book.returnedOn == null).length)
