const io = require('socket.io')()
const axios = require('axios')


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
    axios.post('https://gamegoose.herokuapp.com/users/chatroom', {
      avatar: data.avatar,
      username: data.username,
      message: data.message
    })
    .then( () => {
          io.sockets.emit('new_message', {message: data.message, username: data.username, avatar: data.avatar})
    })
    .catch((err) => {
      console.log(err)
    })
  })

  // socket.on('new_message', (data) => {
  //   fetch("/users/chatroom", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       avatar: data.avatar,
  //       username: data.username,
  //       message: data.message,
  //     }),
  //   });
  //   io.sockets.emit('new_message', {message: data.message, username: data.username, avatar: data.avatar})
  // })

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', {username: data.username})
  })
})

module.exports = io