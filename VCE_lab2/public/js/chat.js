const socket = io()

document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault()
  var input = document.getElementById('input')
  if (input.value) {
    socket.emit('chat message', input.value)
    input.value = ''
  }
})

socket.on('chat message', function (msg) {

  var chat = document.querySelector(".scroll");
  var elem = document.createElement("div");
  elem.className = "message-sent";
  elem.innerHTML = msg;
  chat.appendChild(elem);
  chat.scrollTop = 10000;
})
