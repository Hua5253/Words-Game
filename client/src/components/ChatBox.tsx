import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import "../CSS/ChatBox.css";
import { SocketContext } from "./SocketContext";
interface Message {
    message: string;
    isOwnMessage: boolean;
}

function ChatBox() {
    const messageRef = useRef<HTMLInputElement>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const socket = useContext(SocketContext);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (messageRef.current != null) {
            const { value: msg } = messageRef.current;

            // send message
            if (msg) {
                const data: Message = { message: msg, isOwnMessage: true };
                socket.emit("message", data);
                setMessages([...messages, data]);
                messageRef.current.value = "";
            }
        }
    };

    useEffect(() => {
        const handleNewMessage = (data: Message) => {
            data.isOwnMessage = false;
            setMessages((prevMessages) => [...prevMessages, data]);
        };
        // receive message -> use in useEffect?
        socket.on("chat message", handleNewMessage);

        return () => {
            socket.off("chat message", handleNewMessage);
        };
    }, []);

    return (
        <div>
            <h1>Chat</h1>
            <div className="main">
                <ul className="message-container" id="message-container">
                    {messages.map((data, index) => (
                        <li
                            key={index}
                            className={
                                data.isOwnMessage
                                    ? "message-right"
                                    : "message-left"
                            }
                        >
                            <p className="message">{data.message}</p>
                        </li>
                    ))}
                </ul>
                <form
                    className="message-form"
                    id="message-form"
                    onSubmit={handleSubmit}
                >
                    <div className="container">
                        <input
                            ref={messageRef}
                            type="text"
                            name="message"
                            id="message-input"
                            className="message-input"
                        />
                        <div className="v-divider"></div>
                        <button type="submit" className="send-button">
                            send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChatBox;
