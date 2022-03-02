const sql = require("../db");

// constructor
const Borrowing = function (borrowing) {
    this.studentId = borrowing.studentId,
    this.bookId = borrowing.bookId,
    this.borrowingDate = borrowing.borrowingDate,
    this.returningDate = borrowing.returningDate,
    this.returnedOn = borrowing.returnedOn
};

Borrowing.create = (newBorrowing, result) => {
    sql.query("INSERT INTO borrowings SET ?", newBorrowing, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created borrowing: ", { id: res.insertId, ...newBorrowing });
        result(null, { id: res.insertId, ...newBorrowing });
    });
};

Borrowing.updateById = (returnedOnDate, id, result) => {
    sql.query(
      "UPDATE borrowings SET returnedOn = ? WHERE id = ?",
      [returnedOnDate, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found borrowing with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated borrowing: ", { id: id});
        result(null, { id: id });
      }
    );
  };

Borrowing.getBookHistory = (bookId, result) => {
    let query = `SELECT b.*, s.name FROM borrowings b INNER JOIN students s on b.studentId = s.id WHERE bookId LIKE '%${bookId}%'`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("borrowings: ", res);
        result(null, res);
    });
};

Borrowing.getStudentHistory = (studentId, result) => {
    // console.log(studentId)
    query = `SELECT b.*, k.title FROM borrowings b INNER JOIN books k on b.bookId = k.id WHERE studentId LIKE '%${studentId}%'`;
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("borrowings: ", res);
        result(null, res);
    });
};

module.exports = Borrowing;