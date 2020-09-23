module.exports = connectSockets

function connectSockets(io) {
    //TODO: Complete Overhaul
    //TODO: Complete Overhaul
    //TODO: Complete Overhaul
    io.on('connection', socket => {

        socket.on('user', userId => {
            if (socket.user) {
                socket.leave(socket.userId)
            }
            socket.join(userId)
            socket.user = userId;
        })
        socket.on('updateBoard', board => {
            socket.broadcast.emit('updatedBoard', board)
        })
        socket.on('send-notif', data =>{
            socket.to(data.memberId).emit('accept-notif', data.notification)
        })
    })
}

