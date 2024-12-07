// const Conversation = require("../models/Conversation");




// const createConversation = async (user1Id, user2Id) => {
//     // Check if a conversation already exists between these two users
//     let conversation = await Conversation.findOne({
//         User: { $all: [user1Id, user2Id] },
//     });
  
//     // If no conversation found, create a new one
//     if (!conversation) {
//       conversation = new Conversation({
//         users: [user1Id, user2Id],
//       });
//       await conversation.save();
//     }
  
//     return conversation;
//   };

//   module.exports = {createConversation};