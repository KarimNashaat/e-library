import { Button, Popconfirm } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletingStudentSelector } from '../../../store/slices/loaders/loadersSelectors'
import { QuestionCircleOutlined } from '@ant-design/icons';
import { deleteStudent } from '../../../store/slices/students/actions';

const DeleteStudent = ({ studentId }) => {
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    const deletingStudent = useSelector(deletingStudentSelector)

    return (
        <Popconfirm
            title="Are you sure to delete this student?"
            visible={visible}
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => dispatch(deleteStudent(studentId, () => setVisible(false)))}
            okButtonProps={{ loading: deletingStudent }}
            onCancel={() => setVisible(false)}
            okText="Yes"
            cancelText="No"
        >
            <Button onClick={() => setVisible(true)} danger>Delete</Button>
        </Popconfirm>
    )
}
export default DeleteStudent