$(function() {
  let socket = io.connect('http://localhost:3000')

  let message = $("#message")
  let username = $("#username")
  let send_message = $("#send_message")
  let chatroom = $("#chatroom")
  let avatar = $("#avatar")

  send_message.click(() => {
    socket.emit('new_message', { username: username.val(), message: message.val(), avatar: avatar.val()})
  })

  socket.on("new_message", (data) => {
    chatroom.append(`<p><img id="avatarPhoto" height="30" src="${data.avatar}" alt=""> ${data.username}: ${data.message}</p>`)
  })
})