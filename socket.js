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
      userSocketMap[userId] = socket.id;
      io.emit("online_users", getOnlineUsers());
    }

    socket.on("send_message", (msg) => {
      const receiverSocketId = getReceiverSocketId(msg.receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("new_message", msg);
      }
    });

    socket.on("disconnect", () => {
      delete userSocketMap[userId];
      io.emit("online_users", getOnlineUsers());
    });
  });
}

module.exports = { setupSocket, getReceiverSocketId };
