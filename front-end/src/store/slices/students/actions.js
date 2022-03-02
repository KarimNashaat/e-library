import axios from '../../../axios'
import { toaster } from '../../middlewares/toasterMiddleware/toasterFactory';
import { toasterType } from '../../middlewares/toasterMiddleware/toasterTypes';

export const studentsActionTypes = {
    FETCH_STUDENTS: "FETCH_STUDENTS",
    FETCH_STUDENTS_SUCCESS: "FETCH_STUDENTS_SUCCESS",
    FETCH_STUDENTS_FAIL: "FETCH_STUDENTS_FAIL",

    ADD_NEW_STUDENT: "ADD_NEW_STUDENT",
    ADD_NEW_STUDENT_SUCCESS: "ADD_NEW_STUDENT_SUCCESS",
    ADD_NEW_STUDENT_FAIL: "ADD_NEW_STUDENT_FAIL",

    DELETE_STUDENT: "DELETE_STUDENT",
    DELETE_STUDENT_SUCCESS: "DELETE_STUDENT_SUCCESS",
    DELETE_STUDENT_FAIL: "DELETE_STUDENT_FAIL",

    GET_STUDENT_HISTORY: "GET_STUDENT_HISTORY",
    GET_STUDENT_HISTORY_SUCCESS: "GET_STUDENT_HISTORY_SUCCESS",
    GET_STUDENT_HISTORY_FAIL: "GET_STUDENT_HISTORY_FAIL"

}

export const fetchStudents = () => async dispatch => {
    dispatch({
        type: studentsActionTypes.FETCH_STUDENTS
    })

    axios.get("/getStudents")
        .then(res => {
            console.log("Fetch Students: ", res)
            dispatch(fetchStudentsSuccess(res.data))
        })
        .catch(error => {
            console.log(error)
            dispatch(fetchStudentsFail)
        })
}

export const fetchStudentsSuccess = (students) => {
    return {
        type: studentsActionTypes.FETCH_STUDENTS_SUCCESS,
        payload: students
    }
}

export const fetchStudentsFail = (error) => {
    return {
        type: studentsActionTypes.FETCH_STUDENTS_FAIL,
        meta: {
            ...toaster(toasterType.error, 'Failed to fetch students', error),
        },
    }
}

export const addNewStudent = ({ name, email }, onSuccess) => async dispatch => {
    dispatch({
        type: studentsActionTypes.ADD_NEW_STUDENT
    })

    const body = { name, email }
    axios.post("/addNewStudent", body)
        .then(res => {
            dispatch(addNewStudentSuccess(res.data))
            onSuccess()
        })
        .catch(error => {
            console.log("Add New Student Error: ", error)
            dispatch(addNewStudentFail(error))
        })
}

export const addNewStudentSuccess = (student) => {
    return {
        type: studentsActionTypes.ADD_NEW_STUDENT_SUCCESS,
        payload: student,
        meta: {
            ...toaster(toasterType.success, 'New Student Added Successfully!'),
        },
    }
}

export const addNewStudentFail = (error) => {
    return {
        type: studentsActionTypes.ADD_NEW_STUDENT_FAIL,
        meta: {
            ...toaster(toasterType.error, 'Failed to add student', error),
        },
    }
}

export const deleteStudent = (studentId, onSucces) => async dispatch => {
    dispatch({
        type: studentsActionTypes.DELETE_STUDENT
    })
    const body = { studentId }
    console.log(body)
    axios.post("/deleteStudent", body)
        .then(res => {
            dispatch(deleteStudentSuccess(studentId))
            onSucces()
        })
        .catch(error => {
            console.log("Delete Student Error: ", error)
            dispatch(deleteStudentFail(error))
        })
}

export const deleteStudentSuccess = (studentId) => {
    return {
        type: studentsActionTypes.DELETE_STUDENT_SUCCESS,
        payload: studentId,
        meta: {
            ...toaster(toasterType.success, 'Student Deleted Successfully!'),
        },

    }
}

export const deleteStudentFail = (error) => {
    return {
        type: studentsActionTypes.DELETE_STUDENT_FAIL,
        meta: {
            ...toaster(toasterType.error, 'Failed to delete student', error),
        },
    }
}

export const getStudentHistory = studentId => async dispatch => {
    dispatch({
        type: studentsActionTypes.GET_STUDENT_HISTORY
    })
    const body = { studentId }
    axios.post('/getStudentHistory', body)
        .then(res => {
            console.log(res)
            dispatch({
                type: studentsActionTypes.GET_STUDENT_HISTORY_SUCCESS,
                payload: res.data
            })
        })
        .catch(error => {
            dispatch({
                type: studentsActionTypes.GET_STUDENT_HISTORY_FAIL,
                meta: {
                    ...toaster(toasterType.error, 'Failed to fetch student history', error.response.data.message),
                },
            })
        })
}