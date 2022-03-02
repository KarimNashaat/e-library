import { Form, Input, Button } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addingStudentSelector } from '../../store/slices/loaders/loadersSelectors'
import { addNewStudent } from '../../store/slices/students/actions'
import Loader from '../loader/Loader'

const NewStudentForm = ({ closeModal }) => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const addingStudent = useSelector(addingStudentSelector)

    const onSubmit = (values) => {
        dispatch(addNewStudent(values, onSuccess))
    }

    const onSuccess = () => {
        closeModal()
        form.resetFields()
    }

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            // initialValues={{ remember: true }}
            onFinish={onSubmit}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="name"
                rules={[{ required: true, message: 'Please input student\'s username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[{
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input student\'s E-mail!',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Loader
                    backgroundStyle={{ height: '100%' }}
                    backgroundOpacity={0.5}
                    centerSpinner={false}
                    show={addingStudent}
                    hideChildren={true}
                >
                    <Button type="primary" htmlType="submit">
                        Add
                    </Button>
                </Loader>
            </Form.Item>
        </Form>
    )
}

export default NewStudentForm