require('dotenv').config()

const port = process.env.PORT || 4000
const MONGODB_URL = process.env.MONGODB_URL
const jwtSecret = process.env.JWT_SECRET || "jwtSecret"

const dbConfig = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "ayahesham93",
    DB: "library"
}

module.exports = {
    port,
    MONGODB_URL,
    jwtSecret,
    dbConfig
}