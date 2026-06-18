import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const Chat = ({ message }) => {
    const { authUser, selectedUser } = useSelector(state => state.user);
    const scroll = useRef();

    // Auto-scroll to the newest message
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior:"instant" });
    }, [message]);

    const isOwnMessage = message?.senderId === authUser?._id;
    const dateObj = message?.createdAt ? new Date(message.createdAt) : null;

    // Format time (e.g., "14:30")
    const time = dateObj
        ? dateObj.getHours().toString().padStart(2, '0') +
          ':' +
          dateObj.getMinutes().toString().padStart(2, '0')
        : "";

    // 🔥 FIX: Support both nested media objects and root-level properties
    const mediaUrl = message?.media?.url || message?.mediaUrl;
    const mediaType = message?.media?.type || message?.mediaType || "image";

    // Fallback for missing profile photos to prevent broken image icons
    const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    const profileImage = isOwnMessage ? authUser?.profilePhoto : selectedUser?.profilePhoto;

    return (
        <div
            ref={scroll}
            className={`chat ${isOwnMessage ? 'chat-end' : 'chat-start'}`}
        >
            {/* AVATAR */}
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        src={profileImage || defaultAvatar}
                        alt="User avatar"
                    />
                </div>
            </div>

            {/* TIMESTAMP */}
            <div className="chat-header mb-1">
                <time className="text-xs opacity-50">{time}</time>
            </div>

            {/* CHAT BUBBLE */}
            <div
                className={`chat-bubble ${
                    isOwnMessage ? 'bg-indigo-400 text-white' : 'bg-zinc-300 text-black'
                }`}
            >
                {/* MEDIA: IMAGE */}
                {mediaUrl && mediaType?.toLowerCase() === "image" && (
                    <img
                        src={mediaUrl}
                        alt="Attachment"
                        className="rounded-lg max-w-[250px] mb-2"
                    />
                )}

                {/* MEDIA: PDF */}
                {mediaUrl && mediaType?.toLowerCase() === "pdf" && (
                    <a
                        href={mediaUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="block mb-2 bg-white p-2 rounded text-black font-medium hover:bg-gray-100 transition-colors"
                    >
                        📄 Open PDF
                    </a>
                )}

                {/* TEXT CONTENT */}
                {message?.message && (
                    <div className="break-words text-sm">
                        {message.message}
                    </div>
                )}
            </div>

            {/* STATUS */}
            <div className="chat-footer opacity-50 mt-1 text-xs">
                Delivered
            </div>
        </div>
    );
};

export default Chat;