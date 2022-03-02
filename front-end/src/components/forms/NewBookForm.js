import { Form, Input, Button } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewbook } from '../../store/slices/books/actions';
import { addingBookSelector } from '../../store/slices/loaders/loadersSelectors';
import Loader from '../loader/Loader';

const { TextArea } = Input;

const NewBookForm = ({ closeModal }) => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const addingBook = useSelector(addingBookSelector)

    const onSubmit = (values) => {
        dispatch(addNewbook(values, onSuccess))
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
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Please input book\'s title!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
                rules={[
                    {
                        required: true,
                        message: 'Please add short description!',
                    },
                ]}
            >
                <TextArea rows={4} placeholder="Please add short description" showCount maxLength={100} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Loader
                    backgroundStyle={{ height: '100%' }}
                    backgroundOpacity={0.5}
                    centerSpinner={false}
                    show={addingBook}
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

export default NewBookForm