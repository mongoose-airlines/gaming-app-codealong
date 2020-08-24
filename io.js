const io = require('socket.io')()


let chatters = {}

io.on('connection', (socket) => {
  
  socket.on('register-user', (username) => {
    chatters[socket.id] = username;
    io.emit('update-chatter-list', Object.keys(chatters).map(id => chatters[id]));
    io.emit('user-enter')
  });

  socket.on('disconnect', () => {
    delete chatters[socket.id];
    io.emit('user-exit')
    io.emit('update-chatter-list', Object.keys(chatters).map(id => chatters[id]));
  });

  socket.on('new_message', (data) => {
    io.sockets.emit('new_message', {message: data.message, username: data.username, avatar: data.avatar})
  })

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', {username: data.username})
  })
})

module.exports = io