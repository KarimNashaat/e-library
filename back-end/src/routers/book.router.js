const express = require('express')
const { addNewBook, deleteBook, getBooks, borrowBook, getBookHistory, returnBook, getBooksNotBorrowed } = require('../controllers/book.controller')
const router = express.Router()

router.get("/getBooks/:itemsCount/:pageNum", getBooks)
router.get("/getBooksNotBorrowed/:itemsCount/:pageNum", getBooksNotBorrowed)
router.post("/addNewBook", addNewBook)
router.post("/deleteBook", deleteBook)
router.post("/borrowBook", borrowBook)
router.post("/getBookHistory", getBookHistory)
router.post("/returnBook", returnBook)

module.exports = router