import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import NewBookForm from '../../forms/NewBookForm';

const NewBookModal = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button className='my-3' type="primary" onClick={showModal}>
                + New Book
            </Button>
            <Modal title="Add New Book" visible={isModalVisible} footer={null} onOk={handleOk} onCancel={handleCancel}>
                <NewBookForm closeModal={() => setIsModalVisible(false)} />
            </Modal>
        </>
    );
}

export default NewBookModal