const socket = io();

socket.emit('connection', 'hola desde websocket');