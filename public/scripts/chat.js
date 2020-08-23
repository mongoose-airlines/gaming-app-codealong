
  let socket = io.connect('http://localhost:3000')

  let message = document.getElementById('message')
  let username = document.getElementById('username')
  let send_message = document.getElementById('send_message')
  let chatroom = document.getElementById('chatroom')
  let avatar = document.getElementById('avatar')

  send_message.addEventListener('click', () => {
    socket.emit('new_message', { username: username.value, message: message.value, avatar: avatar.value})
  })

  socket.on("new_message", (data) => {
    let newMessage = document.createElement('p')
    newMessage.innerHTML = `<p><img id="avatarPhoto" height="30" src="${data.avatar}" alt=""> ${data.username}: ${data.message}</p>`
    chatroom.appendChild(newMessage)
  })
