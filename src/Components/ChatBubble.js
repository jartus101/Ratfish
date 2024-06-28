import React from 'react';
import './ChatBubble.css';

const ChatBubble = ({text, isSender, imgURL, name}) => {
    return (
        <div className={isSender ? 'sender' : 'receiver'}>
            {text}
        </div>
    );
}

export default ChatBubble;