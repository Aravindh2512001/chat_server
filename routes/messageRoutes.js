const express = require('express');
const { getConversation, sendMessage } = require('../controller/message.controller');
const authMiddleware = require('../middleware/authMiddleware');
// const {  sendMessage, getConversations, getMessages } = require('../controller/messageController');

const messageRoutes = express.Router();





messageRoutes.get('/messages/:id',authMiddleware, getConversation);
messageRoutes.post('/sendmessage', sendMessage);

// messageRoutes.post('/sendMessage', sendMessage);

// messageRoutes.get('/conversations/:userId', getConversations);

// messageRoutes.get('/:userId/:conversationId', getMessages);



module.exports = messageRoutes;
