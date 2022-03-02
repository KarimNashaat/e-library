import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchingStudentHistorySelector, fetchingStudentsSelector } from '../../../store/slices/loaders/loadersSelectors'
import { getStudentHistory } from '../../../store/slices/students/actions'
import { studentByIdSelector } from '../../../store/slices/students/selectors'
import Loader from '../../loader/Loader'
import StudentHistoryTable from '../../tables/studentHistoryTable/StudentHistoryTable'
import UserInfo from '../../userInfo/UserInfo'

const StudentHistory = () => {
    const dispatch = useDispatch()
    let params = useParams()
    const studentId = params.studentId
    const student = useSelector(studentByIdSelector(studentId))
    const fetchingStudents = useSelector(fetchingStudentsSelector)
    const fetchingStudentHistory = useSelector(fetchingStudentHistorySelector)

    useEffect(() => {
        dispatch(getStudentHistory(studentId))
    }, [])

    return (
        <Loader
            backgroundStyle={{ height: '100%' }}
            backgroundOpacity={0.5}
            centerSpinner={true}
            show={fetchingStudents | fetchingStudentHistory}
            hideChildren={true}
        >
            {student ?
                <div className="container my-3">
                    <UserInfo student={student} />
                    <h1 className='my-3'>
                        Borrowing History
                    </h1>
                    <StudentHistoryTable />

                </div> : null}
        </Loader>
    )
}

export default StudentHistory