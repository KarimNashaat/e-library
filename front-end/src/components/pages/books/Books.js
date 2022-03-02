import React, { useState, useEffect } from 'react'
import BooksList from '../../lists/booksList/BooksList'
import NewBookModal from '../../modals/newBookModal/NewBookModal'
import { Button } from 'antd'
import { SettingOutlined } from '@ant-design/icons'

const Books = () => {
    const [showDeleteBtns, setShowDeleteBtns] = useState(false)

    return (
        <div className="container students-container">
            <div style={{ fontWeight: '400', color: "#222", fontSize: "35px" }}>
                All Books
            </div>
            <div className='d-flex justify-content-between align-items-center w-100'>
                <NewBookModal />
                <Button
                    onClick={() => setShowDeleteBtns(!showDeleteBtns)}
                    className='d-flex align-items-center'
                    icon={<SettingOutlined />}>
                    {showDeleteBtns ? "Finish Editting" : "Edit"}
                </Button>
            </div>
            <BooksList showDeleteBtns={showDeleteBtns} setShowDeleteBtns={setShowDeleteBtns} />
        </div>
    )
}

export default Books