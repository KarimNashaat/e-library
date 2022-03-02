const express = require('express')
const cors = require('cors')
const app = express()
// const passport = require('passport')
const { studentRouter, bookRouter } = require('./routers')
// require('./config/passport')(passport)

app.use(express.json())
app.use(express.static("public"))
app.use(cors())
app.use(studentRouter)
app.use(bookRouter)
// app.use(passport.initialize())

module.exports = app