import { studentsActionTypes } from "../../students/actions"

const initState = {
    fetchingStudents: false,
    addingStudent: false,
    deletingStudent: false,
    fetchingStudentHistory: false
}

export const studentsLoadersReducer = (state = initState, action) => {
    switch (action.type) {
        case studentsActionTypes.FETCH_STUDENTS:
            return { ...state, fetchingStudents: true }
        case studentsActionTypes.FETCH_STUDENTS_SUCCESS:
        case studentsActionTypes.FETCH_STUDENTS_FAIL:
            return { ...state, fetchingStudents: false }

        case studentsActionTypes.ADD_NEW_STUDENT:
            return { ...state, addingStudent: true }
        case studentsActionTypes.ADD_NEW_STUDENT_SUCCESS:
        case studentsActionTypes.ADD_NEW_STUDENT_FAIL:
            return { ...state, addingStudent: false }

        case studentsActionTypes.DELETE_STUDENT:
            return { ...state, deletingStudent: true }
        case studentsActionTypes.DELETE_STUDENT_SUCCESS:
        case studentsActionTypes.DELETE_STUDENT_FAIL:
            return { ...state, deletingStudent: false }

        case studentsActionTypes.GET_STUDENT_HISTORY:
            return { ...state, fetchingStudentHistory: true }
        case studentsActionTypes.GET_STUDENT_HISTORY_SUCCESS:
        case studentsActionTypes.GET_STUDENT_HISTORY_FAIL:
            return { ...state, fetchingStudentHistory: false }

        default:
            return state
    }
}