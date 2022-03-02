import { Button, Card, List, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CrossBtn from '../../buttons/CrossBtn';
import { useDispatch, useSelector } from 'react-redux'
import { booksCountSelector, booksSelector } from '../../../store/slices/books/selectors'
import { fetchingBooksSelector } from '../../../store/slices/loaders/loadersSelectors'
import DeleteBookModal from '../../modals/deleteBookModal/DeleteBookModal'
import { fetchBooks, getBookHistory } from '../../../store/slices/books/actions';

const { Meta } = Card;

const BooksList = ({
    showDeleteBtns, setShowDeleteBtns
}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [selectedBookToDelete, setSelectedBookToDelete] = useState(null)
    const [page, setPage] = useState(1)

    const books = useSelector(booksSelector)
    const booksCount = useSelector(booksCountSelector)
    const fetchingBooks = useSelector(fetchingBooksSelector)

    const gotToBookHistory = (bookId) => {
        navigate(`/books/${bookId}`)
        // dispatch(getBookHistory(bookId))
    }

    useEffect(() => {
        dispatch(fetchBooks(8, page))
    },[])

    return (
        <>
            {selectedBookToDelete ? <DeleteBookModal
                isModalVisible={selectedBookToDelete ? true : false}
                closeModal={() => setSelectedBookToDelete(null)}
                book={selectedBookToDelete}
                onDelete={() => dispatch(fetchBooks(8, page))}
            /> : null}
            {/* <Loader
                backgroundStyle={{ height: '100%' }}
                backgroundOpacity={0.5}
                centerSpinner={true}
                show={fetchingBooks}
                hideChildren={true}
            > */}
            <List
                className='my-3 w-100'
                loading={fetchingBooks}
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 4,
                    xxl: 3,
                }}
                pagination={{
                    onChange: page => {
                        setPage(page)
                        dispatch(fetchBooks(8, page))
                    },
                    pageSize: 8,
                    total: booksCount
                }}
                dataSource={books}
                style={{ height: "100%" }}
                renderItem={item => (
                    <>
                        <List.Item
                            style={{ height: "100%" }}
                            className="pb-4"
                        >
                            <Card
                                className='mb-3 pb=5'
                                style={{ height: "100%" }}
                                onClick={() => gotToBookHistory(item.id)}
                                hoverable
                                // style={{ width: 240 }}
                                cover={<>
                                    <Tag
                                        className='text-center fw-bold d-flex align-items-center justify-content-center'
                                        style={{ height: "32px", fontSize: "20px" }}
                                        color={item.status === 0 ? "green" : "volcano"}>
                                        {item.status === 1 ? " Borrowed" : "Available"}
                                    </Tag>
                                    <img alt="book" src="/assets/images/book.jpg" />
                                </>}
                            >
                                <Meta className='text-break' title={item.title} description={item.description} />

                            </Card>
                            {showDeleteBtns ? <CrossBtn onClick={() => setSelectedBookToDelete(item)}  /> : null}
                        </List.Item>

                    </>
                )}
            />
            {/* </Loader> */}
        </>
    )
}

export default BooksList
