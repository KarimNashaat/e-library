import React, { useState } from 'react'
import { List, Avatar, Skeleton, Button, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { studentsSelector } from '../../../store/slices/students/selectors'
import { fetchingStudentsSelector } from '../../../store/slices/loaders/loadersSelectors'
import { useDispatch, useSelector } from 'react-redux'
import DeleteStudent from './DeleteStudent';
import BorrowModal from '../../modals/borrowModal/BorrowModal';


const StudentsList = () => {
    const dispatch = useDispatch()
    const [borrowingStudent, setBorrowingStudent] = useState(null)
    const [showBorrowingModal, setShowBorrowingModal] = useState(false)
    const students = useSelector(studentsSelector)
    const fetchingStudents = useSelector(fetchingStudentsSelector)

    const openBorrowingModal = (student) => {
        setShowBorrowingModal(true)
        setBorrowingStudent(student)
    }

    return (
        <>
            <BorrowModal
                visible={showBorrowingModal}
                student={borrowingStudent}
                closeModal={() => setShowBorrowingModal(false)}
            />

            {/* <Loader
                backgroundStyle={{ height: '100%' }}
                backgroundOpacity={0.5}
                centerSpinner={true}
                show={fetchingStudents}
                hideChildren={true}
            > */}
                <List
                    className="demo-loadmore-list"
                    loading={fetchingStudents}
                    // loading={true}
                    itemLayout="horizontal"
                    // loadMore={loadMore}
                    dataSource={students}
                    style={{ width: "100%" }}
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 3,
                    }}
                    renderItem={item => (
                        <List.Item
                            actions={[<Button onClick={() => openBorrowingModal(item)}>Borrow</Button>, <DeleteStudent studentId={item.id} />]}
                        >
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
                                    title={<Link 
                                        // onClick={() => dispatch(getStudentHistory(item.id))}
                                        to={`/students/${item.id}`} on>{item.name}</Link>}
                                    description={item.email}
                                />
                                {/* <div>content</div> */}
                            </Skeleton>
                        </List.Item>
                    )}
                />
            {/* </Loader> */}
        </>
    );
}

export default StudentsList