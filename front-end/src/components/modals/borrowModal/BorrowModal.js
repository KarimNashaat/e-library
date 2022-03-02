import React, { useEffect, useState } from 'react'
import { List, message, Avatar, Modal, Button, Skeleton, Divider, DatePicker, Spin } from 'antd';
import moment from 'moment';
import { booksSelector } from '../../../store/slices/books/selectors';
import { useSelector } from 'react-redux';
import BorrowingList from '../../lists/borrowingList/BorrowingList';
import { borrowingBookSelector } from '../../../store/slices/loaders/loadersSelectors';
import SuccessBorrowing from './SuccessBorrowing';

const BorrowModal = ({ visible, student, closeModal }) => {
    const [selectedDate, setSelectedDate] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [successBorrowing, setSuccessBorrowing] = useState(false)
    const borrowingBook = useSelector(borrowingBookSelector)

    const handleCancel = () => {
        closeModal()
    };

    const onClose = () => {
        setSelectedDate(null)
        setSuccessBorrowing(false)
    }

    const onOk = (date) => {
        setErrorMessage(null)
        setSelectedDate(date.format("YYYY-MM-DD HH:mm"))
    }

    function range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().add(-1, 'days').endOf('day');
    }

    function disabledDateTime(d) {
        if (d) {
            let selectedDate = d.format("YYYY-MM-DD")
            let now = moment().format("YYYY-MM-DD")
            if (moment(selectedDate).isSame(moment(now))) {
                let disabledHours = () => range(0, 24).splice(0, moment().hour())
                let disabledMinutes = null
                if (moment(d.format("YYYY-MM-DD HH")).isSame(moment(moment().format("YYYY-MM-DD HH")))) {
                    return {
                        disabledHours,
                        disabledMinutes: () => range(0, moment().minute())
                    }
                }
                else {
                    return {
                        disabledHours,
                        disabledMinutes
                    }
                }
            }
        }
        return null

    }

    return (
        <Modal destroyOnClose={true} title="Borrow A Book" visible={visible} footer={null} onCancel={handleCancel} afterClose={onClose}>
            {successBorrowing ? < SuccessBorrowing borrowingBody={successBorrowing} /> :
                <Spin spinning={borrowingBook}>
                    <div>
                        <p>
                            <span className='fw-bold'> {student?.name}</span>, please select a returning date!
                        </p>
                        <DatePicker
                            format="YYYY-MM-DD HH:mm"
                            disabledDate={disabledDate}
                            disabledTime={disabledDateTime}
                            showTime={{ defaultValue: moment(moment().format("HH: mm"), 'HH:mm') }}
                            showNow={false}
                            className="mb-3"
                            onOk={onOk}
                        />
                        {errorMessage}
                        <BorrowingList
                            student={student}
                            setErrorMessage={value => setErrorMessage(value)}
                            selectedDate={selectedDate}
                            onSuccess={(borrowingBody => setSuccessBorrowing(borrowingBody))}
                        />
                    </div>
                </Spin>
            }
        </Modal >
    )
}

export default BorrowModal