const express = require('express')
const { addNewStudent, deleteStudent, getStudents, getStudentHistory } = require('../controllers/student.controller')
const router = express.Router()

router.get("/getStudents", getStudents)
router.post("/addNewStudent", addNewStudent)
router.post("/deleteStudent", deleteStudent)
router.post("/getStudentHistory", getStudentHistory)

module.exports = router