import { booksActionTypes } from '../books/actions'
import { studentsActionTypes } from './actions'

const initState = {
    students: [],
    studentHistory: []
}

export const studentsReducer = (state = initState, action) => {
    switch (action.type) {
        case studentsActionTypes.FETCH_STUDENTS_SUCCESS:
            return { ...state, students: action.payload }
        case studentsActionTypes.ADD_NEW_STUDENT_SUCCESS:
            return {
                ...state,
                students: [
                    ...state.students,
                    action.payload
                ]
            }
        case studentsActionTypes.DELETE_STUDENT_SUCCESS:
            return {
                ...state,
                students: state.students.filter(student => student.id !== action.payload)
            }
        case studentsActionTypes.GET_STUDENT_HISTORY_SUCCESS:
            return {
                ...state,
                studentHistory: action.payload
            }

        case booksActionTypes.RETURN_BOOK_SUCCESS:
            return {
                ...state,
                studentHistory: state.studentHistory.map(borrowing => {
                    if (borrowing.id == action.payload.borrowingId) {
                        borrowing.returnedOn = action.payload.returnedOnDate
                    }
                    return borrowing
                })
            }
        default:
            return state;
    }
}