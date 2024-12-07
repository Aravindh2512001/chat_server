// const Conversation = require("../models/Conversation");
// const Message = require("../models/Message");
// const User = require("../models/User");
// const { createConversation } = require("./conversationController");




// const sendMessage = async (req, res) => {
//   const { senderId, receiverId, message } = req.body;

//   try {
//     // Validate input
//     if (!senderId || !receiverId || !message) {
//       return res.status(400).json({ error: 'All fields (sender, receiver, message) are required' });
//     }

//     // Create or find the conversation between the sender and receiver
//     let conversation = await Conversation.findOne({
//       users: { $all: [senderId, receiverId] }, // Both users must be part of the conversation
//     });

//     // If no conversation exists, create a new one
//     if (!conversation) {
//       conversation = new Conversation({
//         users: [senderId, receiverId],
//         lastMessage: null, // This will be updated after the message is saved
//       });
//       await conversation.save();
//     }

//     // Create a new message
//     const newMessage = new Message({
//       conversationId: conversation._id, // Link the conversation
//       sender: senderId,
//       receiver: receiverId,
//       message, // Text of the message
//     });

//     // Save the message to the database
//     await newMessage.save();

//     // Update the conversation's lastMessage field
//     conversation.lastMessage = newMessage._id;
//     await conversation.save();

//     // Return the created message and conversation
//     return res.status(201).json({ 
//       success: true, 
//       message: 'Message sent successfully!', 
//       data: newMessage 
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

  
//   // Get all conversations for a user
// const getConversations = async (req, res) => {
//     const { userId } = req.params;
  
//     try {
//       const conversations = await Conversation.find({
//         users: userId,
//       }).populate('users', 'username avatar').populate('lastMessage');
  
//       return res.status(200).json({ success: true, conversations });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ success: false, message: 'Server error' });
//     }
//   };


//   // Get all messages in a conversation
// const getMessages = async (req, res) => {
//     const { userId, conversationId } = req.params;
  
//     try {
//       // Check if the user is part of the conversation
//       const conversation = await Conversation.findOne({
//         _id: conversationId,
//         users: userId,
//       });
  
//       if (!conversation) {
//         return res.status(403).json({ success: false, message: 'Access denied' });
//       }
  
//       // Fetch all messages in the conversation
//       const messages = await Message.find({ conversationId })
//         .populate('sender', 'username avatar')
//         .populate('receiver', 'username avatar');
  
//       return res.status(200).json({ success: true, messages });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ success: false, message: 'Server error' });
//     }
//   };
  
  

// module.exports = {sendMessage, getConversations, getMessages}