import React from 'react'
import { Table, Tag } from 'antd';
import { useSelector } from 'react-redux';
import { bookHistorySelector } from '../../../store/slices/books/selectors';

const columns = [
    {
        title: 'Student ID',
        dataIndex: 'studentId',
        key: 'studentId',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Student Name',
        dataIndex: 'name',
        key: 'name',
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
];

const BookHistoryTable = () => {
    const bookHistory = useSelector(bookHistorySelector)
    return (
        <Table className='w-100' columns={columns} dataSource={bookHistory} />
    )
}

export default BookHistoryTable