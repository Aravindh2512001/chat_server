const socketIo = require("socket.io");

const userSocketMap = {};

function getReceiverSocketId(receiverId) {
  return userSocketMap[receiverId];
}

function getOnlineUsers() {
  return Object.keys(userSocketMap);
}

function setupSocket(server) {
  const io = socketIo(server, {
    cors: {
      origin: '*:*',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap[userId] = socket.id; // Add user to socket map
      io.emit("online_users", getOnlineUsers()); // Broadcast online users list
    }

    socket.on("send_message", (msg) => {
      const receiverSocketId = getReceiverSocketId(msg.receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("new_message", msg); // Send message to the receiver
      }
    });

    socket.on("disconnect", () => {
      delete userSocketMap[userId]; // Remove user from map on disconnect
      io.emit("online_users", getOnlineUsers()); // Broadcast updated online users list
    });
  });
}

module.exports = { setupSocket, getReceiverSocketId };
