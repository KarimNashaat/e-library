import React from 'react'
import { Button, Space, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { studentHistorySelector } from '../../../store/slices/students/selectors';
import { returnBook } from '../../../store/slices/books/actions';
import { returningBookSelector } from '../../../store/slices/loaders/loadersSelectors';
import moment from 'moment';

const StudentHistoryTable = () => {
    const dispatch = useDispatch()
    const returningBook = useSelector(returningBookSelector)

    const columns = [
        {
            title: 'Book ID',
            dataIndex: 'bookId',
            key: 'bookId',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Book Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Borrowing Date',
            dataIndex: 'borrowingDate',
            key: 'borrowingDate',
        },
        {
            title: 'Returning Date',
            key: 'returningDate',
            dataIndex: 'returningDate',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'returnedOn',
            render: value => {
                if (value) {
                    return (<Tag color={'green'}>
                        Returned
                    </Tag>)
                }
                return (
                    <Tag color={"volcano"}>
                        Still Borrowed
                    </Tag>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <>
                    {record.returnedOn ? "No Action" : <Button
                        loading={returningBook}
                        onClick={() => dispatch(returnBook(record.id, moment().format("YYYY-MM-DD"), record.bookId))}>
                        Return
                    </Button>}
                </>
            ),
        },
    ];
    const studentHistory = useSelector(studentHistorySelector)
    return (
        <Table columns={columns} dataSource={studentHistory} />
    )
}

export default StudentHistoryTable