const Message = require("../models/Message.model");
const { getReceiverSocketId } = require("../socket");
const io = require("../socket").io;

const getConversation = async (req, res) => {
  try {
    const { id: friendId } = req.params;
    const userId = req.user._id;
    if (!userId || !friendId) {
      return res.status(400).json({ error: "Invalid user or friend ID provided." });
    }

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: friendId },
        { senderId: friendId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch the conversation." });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, text, image } = req.body;

    if (!senderId || !receiverId || (!text && !image)) {
      return res.status(400).json({ error: "Incomplete message data." });
    }

    const newMessage = await Message.create({ senderId, receiverId, text, image });

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("new_message", newMessage); // Emit new message to receiver
    }

    res.status(200).json({ success: true, newMessage });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to send the message." });
  }
};

module.exports = { getConversation, sendMessage };
