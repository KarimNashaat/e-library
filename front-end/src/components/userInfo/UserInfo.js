import { Card } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { noReturnedBooksCountSelector, studentHistorySelector } from '../../store/slices/students/selectors'

const UserInfo = ({ student }) => {
    const borrowingCount = useSelector(noReturnedBooksCountSelector)
    const studentBooks = useSelector(studentHistorySelector)
    return (
        <Card className='m-auto' style={{ width: "fit-content", minWidth: "50%" }}>
            <div className='d-flex flex-column align-items-center'>
                <img className='user-img' src="https://joeschmoe.io/api/v1/random" width="100px" />
                <div className='d-flex flex-column align-items-center mx-3 ' style={{ fontWeight: "400", fontSize: "18px" }}>
                    <p className='mt-3 mb-1 fw-bold'>
                        {student.name}
                    </p>
                    <p className='fw-bold'>
                        {student.email}
                    </p>
                    <div className='d-flex'>
                        <div className='d-flex flex-column align-items-center me-3 text-secondary'>
                            <span> {studentBooks.length} </span>
                            Borrowed
                        </div>
                        <div className='d-flex flex-column align-items-center ms-3 text-secondary'>
                            <span> {borrowingCount}</span>
                            Borrowing
                        </div>
                    </div>

                </div>
            </div>
        </Card>
    )
}

export default UserInfo