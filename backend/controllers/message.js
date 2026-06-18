import { uploadToCloudinary } from "../config/cloudinary.js";
import { Conversation } from "../models/conversation.js";
import { Message } from "../models/message.js";
import { io,getSocketId } from "../socket.js";



export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    let mediaUrl = null;
    let mediaType = null;

    if (req.file) {
      // detect type BEFORE deleting file
      const mime = req.file.mimetype;

      if (mime.startsWith("image/")) {
        mediaType = "Image";
      } else if (mime === "application/pdf") {
        mediaType = "Pdf";
      } else {
        mediaType = "File";
      }

  const result = await uploadToCloudinary(req.file.buffer);

mediaUrl = result.secure_url;

      // FileSystem.unlinkSync(req.file.path);
    }

    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!gotConversation) {
      gotConversation = new Conversation({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      mediaUrl,
      mediaType,
    });

    await newMessage.save();

    gotConversation.messages.push(newMessage._id);
    await gotConversation.save();

    // socket emit
    const receiverSocketId = getSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    const senderSocketId = getSocketId(senderId);
    if (senderSocketId) {
      io.to(senderSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json({
      status: "Message sent successfully",
      message: newMessage,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessage = async(req,res) => {
    try{
        const senderId = req.id;
    const receiverId = req.params.id;

    const reqConvo = await Conversation.findOne({
        participants: {$all : [senderId, receiverId]},
    }).populate("messages")

    console.log(reqConvo);
    return res.status(200).json({messages :  reqConvo?.messages || []
     });
    }

    catch (error) {
        console.log(error);
    }
}
