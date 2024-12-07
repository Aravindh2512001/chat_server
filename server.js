const express = require('express');
const cors = require('cors');
const http = require('http');
const connectDb = require('./db/db');
const { port, api } = require('./config/env');
const authRoutes = require('./routes/authroutes');
const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
require('dotenv').config();
const { setupSocket } = require('./socket');

// Initialize express app
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({
  origin: [
    // Development environments
    'http://localhost:5173',  
    'http://localhost:5000', 
    
    // Production environments
    'https://chat-client-ashy-eta.vercel.app',
    // 'https://chat-client-2301-git-main-aravindhs-projects-0d80c1d4.vercel.app',
    // 'https://chat-client-2301-73yv3mwom-aravindhs-projects-0d80c1d4.vercel.app',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, 
}));


app.use(express.json());
app.use(cookieParser());
app.use(morgan('tiny'));

// Database connection
connectDb();

// Routes
app.use(`${api}/auth`, authRoutes);
app.use(`${api}/user`, userRoutes);
app.use(`${api}/message`, messageRoutes);

// Initialize socket
setupSocket(server);

app.get('/', (req, res) => {
  res.send('Server is running successfully!');
});

if (process.env.NODE_ENV === 'development') {
  // Development-specific configurations
  console.log('Running in development mode');
} else if (process.env.NODE_ENV === 'production') {
  // Production-specific configurations
  console.log('Running in production mode');
}


// Start the server
server.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
