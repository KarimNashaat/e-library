import React, { useEffect } from 'react'
import StudentsList from '../../lists/studentsList/StudentsList'
import NewStudentModal from '../../modals/newStudentModal/NewStudentModal'
import "./Students.css"

const Students = () => {
    return (
        <div className="container students-container">
            <div style={{ fontWeight: '400', color: "#222", fontSize: "35px" }}>
                All Students
            </div>
            <NewStudentModal />
            <StudentsList />
        </div>
    )
}

export default Students