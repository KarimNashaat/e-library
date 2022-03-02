import React, { useEffect, useState } from 'react'
import { List, message, Avatar, Modal, Button, Skeleton, Divider } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux';
import { booksSelector, notBorrowedBooksSelector } from '../../../store/slices/books/selectors';
import { borrowBook } from '../../../store/slices/books/actions';
import moment from 'moment';
import axios from '../../../axios';

const BorrowingList = ({
    student, selectedDate, setErrorMessage, onSuccess
}) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [pageNum, setPageNum] = useState(1)
    const [count, setCount] = useState(0)
    let errorMessage = null

    const handleSubmit = (book) => {
        console.log(book)
        if (selectedDate) {
            const borrowingDate = moment().format("YYYY-MM-DD HH:mm")
            dispatch(borrowBook(student, book, selectedDate, borrowingDate, onSuccess))
        }
        else {
            errorMessage = <p className='text-danger'> PLEASE SELECT A DATE!</p>
            setErrorMessage(errorMessage)
        }
    }

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        axios.get(`/getBooksNotBorrowed/${4}/${pageNum}`)
            .then(res => {
                console.log(res)
                let notBorrowedBooks = res.data.books.filter(book => book.status === 0)
                setData([...data, ...notBorrowedBooks]);
                setLoading(false);
                setPageNum(pageNum + 1)
                setCount(res.data.count)
                console.log(res.data.count)
            })
            .catch(() => {
                console.log('here')
                setLoading(false);
            });
    };

    useEffect(() => {
        loadMoreData();
    }, []);
    return (
        <div
            id="scrollableDiv"
            style={{
                height: 300,
                overflow: 'auto',
                padding: '0 16px',
                // border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
        >
            <InfiniteScroll
                dataLength={count}
                next={loadMoreData}
                hasMore={data.length < count}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>It is all, nothing more</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={data}
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <List.Item.Meta
                                avatar={<Avatar src="/assets/images/book.jpg" />}
                                title={<a >{item.title}</a>}
                                description={item.description}
                            />
                            <Button onClick={() => handleSubmit(item)}> Borrow </Button>
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
    )
}

export default BorrowingList