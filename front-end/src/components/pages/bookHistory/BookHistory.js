import { Card } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBookHistory } from '../../../store/slices/books/actions';
import { bookByIdSelector } from '../../../store/slices/books/selectors';
import { fetchingBookHistorySelector, fetchingBooksSelector } from '../../../store/slices/loaders/loadersSelectors';
import Loader from '../../loader/Loader';
import BookHistoryTable from '../../tables/bookHistoryTable/BookHistoryTable'
import './BookHistory.css'

const { Meta } = Card;

const BookHistory = () => {
    const dispatch = useDispatch()
    let params = useParams();
    const bookId = params.bookId
    const book = useSelector(bookByIdSelector(bookId))
    const fetchingBooks = useSelector(fetchingBooksSelector)
    const fetchingBookHistory = useSelector(fetchingBookHistorySelector)

    useEffect(() => {
        dispatch(getBookHistory(bookId))
    }, [])

    return (
        <Loader
            backgroundStyle={{ height: '100%' }}
            backgroundOpacity={0.5}
            centerSpinner={true}
            show={fetchingBooks | fetchingBookHistory}
            hideChildren={true}
        >
            {book ? <div className='d-flex flex-column container my-3'>
                <h1> Borrowing History</h1>
                <div className='bookHistory-container'>
                    <Card
                        hoverable
                        className='bookHistory-card'
                        cover={<img alt="book" src="/assets/images/book.jpg" />}
                    >
                        <Meta className='text-break' title={book.title} description={book.description} />
                    </Card>
                    <BookHistoryTable bookId={bookId} />
                </div>
            </div> : null}
        </Loader>
    )
}

export default BookHistory