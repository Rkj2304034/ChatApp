// socket.js (ESM)
import { Server } from 'socket.io';

// In-memory user tracking
let io; 
const onlineUsers = new Map();

 const getSocketId = (userId) => {
  return onlineUsers.get(userId);
}

export function initSocket(server) {
   io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      onlineUsers.set(userId, socket.id);
      io.emit('getOnlineUsers', Array.from(onlineUsers.keys()));
    }

    

    socket.on('disconnect', () => {
      for (const [uid, sid] of onlineUsers.entries()) {
        if (sid === socket.id) {
          onlineUsers.delete(uid);
          break;
        }
      }
      io.emit('getOnlineUsers', Array.from(onlineUsers.keys()));
    });
  });
}

export  {io,getSocketId};
