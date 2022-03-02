const schedule = require('node-schedule');
const moment = require('moment');
const Borrowing = require('../models/borrowing.model');
const Book = require('../models/book.model');

const returnBookAutomatically = (returnDate, borrowingId, bookId) => {
    const job = schedule.scheduleJob(moment(returnDate).toDate(), function () {
        Borrowing.updateById(returnDate, borrowingId, (err, result) => {
            if (err) {
                if (err.kind === "not_found") {
                    console.log(`Not found borrowing with id ${borrowingId}.`)
                } else {
                    console.log("Could not update borrowing with id " + borrowingId)
                }
            }
            else {
                Book.updateById(bookId, 0, (err, data) => {
                    if (err) {
                        if (err.kind === "not_found") {
                            console.log(`Not found book with id ${bookId}.`)
                        } else {
                            console.log("Could not update book with id " + bookId)
                        }
                    } else console.log(`Book status was updated successfully!`)
                })
            }
        })
    });
}

module.exports = {
    returnBookAutomatically
}