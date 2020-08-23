// Adjust this before deploying!!!
let socket = io.connect('http://localhost:3000')

let message = document.getElementById('message')
let username = document.getElementById('username')
let send_message = document.getElementById('send_message')
let chatroom = document.getElementById('chatroom')
let avatar = document.getElementById('avatar')
let isTyping = document.getElementById('isTyping')

send_message.addEventListener('click', () => {
  socket.emit('new_message', { username: username.value, message: message.value, avatar: avatar.value})
})

message.addEventListener('keypress', () => {
  socket.emit('typing', { username: username.value })
})

socket.on('typing', (data) => {
  isTyping.innerText = `${data.username} is typing...`
})

socket.on("new_message", (data) => {
  message.value = ''
  isTyping.innerText = ''
  let newMessage = document.createElement('p')
  newMessage.innerHTML = `<p><img id="avatarPhoto" height="30" src="${data.avatar}" alt=""> ${data.username}: ${data.message}</p>`
  chatroom.prepend(newMessage)
  fetch('/users/chatroom', {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({"avatar": data.avatar, "username": data.username, "message": data.message })})
})
