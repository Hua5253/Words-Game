import { FormEvent, useRef, useState } from "react";
import "./ ChatBox.css";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:3000");

interface Message {
    message: string;
    isOwnMessage: boolean;
}

function ChatBox() {
    const messageRef = useRef<HTMLInputElement>(null);
    const [messages, setMessages] = useState<Message[]>([]);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (messageRef.current != null) {
            const { value: msg } = messageRef.current;
            // send message
            const data: Message = { message: msg, isOwnMessage: true };
            socket.emit("message", data);
            setMessages([...messages, data]);
            messageRef.current.value = "";
        }
    };

    // receive message
    socket.on("chat message", data => {
        data.isOwnMessage = false;
        setMessages([...messages, data]);
    });

    return (
        <div>
            <h1>Chat</h1>
            <div className='main'>
                <ul className='message-container' id='message-container'>
                    {messages.map((data, index) => (
                        <li
                            key={index}
                            className={
                                data.isOwnMessage
                                    ? "message-right"
                                    : "message-left"
                            }
                        >
                            <p className='message'>{data.message}</p>
                        </li>
                    ))}
                </ul>
                <form
                    className='message-form'
                    id='message-form'
                    onSubmit={handleSubmit}
                >
                    <input
                        ref={messageRef}
                        type='text'
                        name='message'
                        id='message-input'
                        className='message-input'
                    />
                    <div className='v-divider'></div>
                    <button type='submit' className='send-button'>
                        send
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChatBox;
