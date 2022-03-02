import { Result } from 'antd'
import moment from 'moment'
import React from 'react'

const SuccessBorrowing = ({ borrowingBody }) => {
    const { studentName, bookTitle, returningDate } = borrowingBody
    const subTitle = <div>
        <span className='fw-bold'>{studentName} </span>
        successfully borrowed 
        <span className='fw-bold'> {bookTitle} </span>
        <br/>
        The book will be returned automatically to the library on 
        <span className='fw-bold'> {moment(returningDate).format("dddd, MMMM Do YYYY, h:mm a")}</span>,
        if <span className='fw-bold'>{studentName} </span> did not return it before that date.
    </div>
    return (
        <Result
            status="success"
            title="Successfully Borrowed The Book!"
            subTitle={subTitle}
        />
    )
}

export default SuccessBorrowing