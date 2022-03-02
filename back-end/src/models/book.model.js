const sql = require("../db");

// constructor
const Book = function (book) {
  this.title = book.title;
  this.description = book.description;
  this.status = 0
};

Book.create = (newBook, result) => {
  sql.query("INSERT INTO books SET ?", newBook, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created book: ", { id: res.insertId, ...newBook });
    result(null, { id: res.insertId, ...newBook });
  });
};

Book.getAll = (itemsPerPage, pageNum, result) => {
  let skip = itemsPerPage * pageNum;
  let limit = skip + ',' + itemsPerPage;
  sql.query("SELECT count(*) as rowsCount FROM books", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    count = res[0].rowsCount

    sql.query(`SELECT * FROM books ORDER BY ID DESC LIMIT ${limit}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      const data = {
        books: res,
        count
      }
      console.log("books: ", data);
      result(null, data);
    });
  });
};

Book.getAllNotBorrowed = (itemsPerPage, pageNum, result) => {
  let skip = itemsPerPage * pageNum;
  let limit = skip + ',' + itemsPerPage;
  sql.query("SELECT count(*) as rowsCount FROM books WHERE status = 0", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    count = res[0].rowsCount

    sql.query(`SELECT * FROM books ORDER BY ID DESC LIMIT ${limit}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      const data = {
        books: res,
        count
      }
      console.log("books: ", data);
      result(null, data);
    });
  });
};

Book.remove = (id, result) => {
  sql.query("DELETE FROM books WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Book with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted book with id: ", id);
    result(null, res);
  });
};

Book.updateById = (id, status, result) => {
  sql.query(
    "UPDATE books SET status = ? WHERE id = ?",
    [status, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Book with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated book: ", { id: id, ...status });
      result(null, { id: id, ...status });
    }
  );
};

module.exports = Book;