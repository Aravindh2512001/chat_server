// const mongoose = require('mongoose');

// // Message Schema
// const messageSchema = new mongoose.Schema({
//   conversationId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Conversation',
//     required: true,
//   },
//   sender: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   receiver: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   message: {
//     type: String,
//     required: true,
//   },
//   messageType: {
//     type: String,
//     default: 'text',
//   },
//   readBy: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//     },
//   ],
// }, { timestamps: true });

// const Message = mongoose.model('Message', messageSchema);
// module.exports = Message;
