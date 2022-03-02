const moment = require("moment");
const Book = require("../models/book.model");
const Borrowing = require("../models/borrowing.model");
const { returnBookAutomatically } = require("../services/book.service");

const getBooks = async (req, res) => {
    const itemsCount = req.params.itemsCount
    const pageNum = req.params.pageNum
    Book.getAll(itemsCount, pageNum -1 , (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving books."
            });
        else res.send(data);
    });
}

const getBooksNotBorrowed = async (req, res) => {
    const itemsCount = req.params.itemsCount
    const pageNum = req.params.pageNum
    Book.getAllNotBorrowed(itemsCount, pageNum -1 , (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving books."
            });
        else res.send(data);
    });
}

const addNewBook = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Book
    const { title, description } = req.body
    const newBook = new Book({ title, description })

    // Save Book in the database
    Book.create(newBook, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Book."
            });
        else res.send(data);
    });
}

const deleteBook = async (req, res) => {
    Book.remove(req.body.bookId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Book with id ${req.body.bookId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Book with id " + req.body.bookId
                });
            }
        } else res.send({ message: `Book was deleted successfully!` });
    });
}


const borrowBook = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const {
        studentId,
        bookId,
        borrowingDate,
        returningDate
    } = req.body

    if (moment(borrowingDate).diff(moment(returningDate)) > 0) {
        return res.status(500).send({
            message:
                "Returning date can't be earlier than borrowing date!"
        });
    }

    // Create a Borrowing
    const newBorrowing = new Borrowing({
        studentId,
        bookId,
        borrowingDate,
        returningDate
    })

    // Save Borrowing in the database
    Borrowing.create(newBorrowing, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Borrowing."
            });
        else {
            returnBookAutomatically(returningDate, data.id, bookId)
            Book.updateById(bookId, 1, (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `Not found book with id ${bookId}.`
                        });
                    } else {
                        res.status(500).send({
                            message: "Could not update book with id " + bookId
                        });
                    }
                } else res.send({ message: `Book status was updated successfully!` });
            })
        }
    });
}

const getBookHistory = (req, res) => {
    // Validate request
    if (!req.body.bookId) {
        res.status(400).send({
            message: "Book Id can not be empty!"
        });
    }

    Borrowing.getBookHistory(req.body.bookId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving book history."
            });
        else res.send(data);
    })
}

const returnBook = (req, res) => {
    // Validate request
    if (!req.body.borrowingId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const returnedOnDate = req.body.returnedOnDate
    const borrowingId = req.body.borrowingId
    const bookId = req.body.bookId
    Borrowing.updateById(returnedOnDate, borrowingId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found borrowing with id ${borrowingId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not update borrowing with id " + borrowingId
                });
            }
        } else {
            Book.updateById(bookId, 0, (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `Not found book with id ${bookId}.`
                        });
                    } else {
                        res.status(500).send({
                            message: "Could not update book with id " + bookId
                        });
                    }
                } else res.send({ message: `borrowing status was updated successfully!` });
            })
        }
    })
}

module.exports = {
    getBooks,
    getBooksNotBorrowed,
    addNewBook,
    deleteBook,
    borrowBook,
    getBookHistory,
    returnBook
}