const Borrowing = require("../models/borrowing.model");
const Student = require("../models/student.model")

const getStudents = async (req, res) => {
    Student.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving students."
            });
        else res.send(data);
    });
}

const addNewStudent = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Student
    const { name, email } = req.body
    const newStudent = new Student({ name, email })

    // Save Student in the database
    Student.create(newStudent, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Student."
            });
        else res.send(data);
    });
}

const deleteStudent = async (req, res) => {
    Student.remove(req.body.studentId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Student with id ${req.body.studentId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Student with id " + req.body.studentId
                });
            }
        } else res.send({ message: `Student was deleted successfully!` });
    });
}

const getStudentHistory = (req, res) => {
    // Validate request
    if (!req.body.studentId) {
        res.status(400).send({
            message: "Student Id can not be empty!"
        });
    }
    const studentId = req.body.studentId
    console.log(studentId)
    Borrowing.getStudentHistory(studentId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving student history."
            });
        else res.send(data);
    })
}

module.exports = {
    getStudents,
    addNewStudent,
    deleteStudent,
    getStudentHistory
}