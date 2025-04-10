// src/socket.js
import { io } from 'socket.io-client';

export const initSocket = async () => {
  const options = {
    'force new connection': true,
    reconnectionAttempts: Infinity,
    timeout: 10000,
    transports: ['websocket'],
  };

  const socket = io(import.meta.env.VITE_APP_BACKEND_URL, options);

  socket.on('connect', () => {
    console.log('✅ Connected to socket server');
  });

  socket.on('disconnect', () => {
    console.log('❌ Disconnected from socket server');
  });

  return socket;
};
