const passport = require('passport')

exports.init = () => {
    const wrapMiddlewareForSocketIo = middleware => (socket, next) => middleware(socket.request, {}, next);
    global.io.use(wrapMiddlewareForSocketIo(passport.authenticate('jwt', { session: false })));

    global.io.on("connection", function (socket) {
        console.log("Made socket connection");
        
        socket.on("disconnect", () => {
            console.log('user disconnected')
        });
    });
}