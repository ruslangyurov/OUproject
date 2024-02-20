const socket = io();

function appendMessage(message) {
  const  = document.getElementById('bay');
  
}

socket.on('init', (messages) => {
  const ul = document.getElementById('messages');
  ul.innerHTML = ''; // Clear existing messages

  messages.forEach((message) => {
    appendMessage(message);
  });
});

socket.on('message', (message) => {
  appendMessage(message);
});

function sendMessage() {
  const text = document.getElementById('messageInput').value;
  const user = 'User'; // For simplicity, we'll use a fixed user name

  socket.emit('message', { text, user });

  document.getElementById('messageInput').value = '';
}