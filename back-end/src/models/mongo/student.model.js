const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const findOrCreate = require('mongoose-findorcreate')

const StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
})

const Student = mongoose.model('Student', StudentSchema)

module.exports = Student