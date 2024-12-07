// server.js
const express = require('express');
const cors = require('cors');
const http = require('http');
const connectDb = require('./db/db');
const { port, api } = require('./config/env');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

// Create an express app
const app = express();

// Create the HTTP server using the express app
const server = http.createServer(app);

// Set up socket.io
const {setupSocket} = require('./socket') // Import socket logic

// Initialize socket.io with the server
setupSocket(server);

// Middleware 
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true,
  SameSite: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('tiny'));

// Connect to the database
connectDb();

// Routes
app.use(`${api}/auth`, authRoutes);
app.use(`${api}/user`, userRoutes);
app.use(`${api}/message`, messageRoutes);

// Start the server
server.listen(port || 5000, () => {
  console.log(`App running on http://localhost:${port || 5000}`);
});
