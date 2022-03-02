import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { deletingBookSelector } from '../../../store/slices/loaders/loadersSelectors';
import { deletebook } from '../../../store/slices/books/actions';

const DeleteBookModal = ({
    isModalVisible, closeModal, book, onDelete
}) => {
    const dispatch = useDispatch()
    const deletingBook = useSelector(deletingBookSelector)

    const showModal = () => {
        // setIsModalVisible(true);
    };

    const handleOk = () => {
        closeModal();
    };

    const handleCancel = () => {
        closeModal();
    };

    const onSuccesDelete = () => {
        onDelete()
        closeModal()
    }

    return (
        <>
            <Modal title="Confirm Deleting Book" visible={isModalVisible} footer={null} onOk={handleOk} onCancel={handleCancel}>
                <div className='d-flex flex-column'>
                    <div>
                        Are you sure to delete <span className='fw-bold'> {book.title}</span> book ?
                    </div>
                    <div className='align-self-end'>
                        <Button> Cancel </Button>
                        <Button
                            loading={deletingBook}
                            type="danger my-3 ms-3"
                            onClick={() => dispatch(deletebook(book.id, onSuccesDelete))}
                        > {deletingBook ? "Deleting" : "Delete"}  </Button>
                    </div>

                </div>
            </Modal>
        </>
    );
}

export default DeleteBookModal