const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const { connectDB } = require('./utils/db');
const socketService = require('./services/socketService');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());

// CORS Middleware
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

// Routes
app.use('/api/auth', authRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('✅ Code Editor API is working fine!');
});

// Socket.io setup
const io = socketIo(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Handle socket connections
io.on('connection', (socket) => {
  console.log(`🔌 New client connected: ${socket.id}`);
  socketService.handleConnection(socket, io);
});

// Connect to MongoDB
connectDB();

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
