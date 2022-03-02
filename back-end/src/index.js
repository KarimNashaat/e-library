const app = require('./app')
const server = require('http').createServer(app)
const { Server } = require("socket.io");
const { port } = require('./config')
const sockets = require('./sockets')
global.io = new Server(server)

sockets.init()

server.listen(port, () => {
    console.log("Server is runnung on port: " + port)
})