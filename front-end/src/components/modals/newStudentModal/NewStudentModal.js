import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'antd'
import NewStudentForm from '../../forms/NewStudentForm';

const NewStudentModal = () => {
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
                + New Student
            </Button>
            <Modal title="Add New Student" visible={isModalVisible} footer={null} onOk={handleOk} onCancel={handleCancel}>
                <NewStudentForm closeModal={() => setIsModalVisible(false)} />
            </Modal>
        </>
    );
}

export default NewStudentModal