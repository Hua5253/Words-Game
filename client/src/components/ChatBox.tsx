import "./ ChatBox.css";

function ChatBox() {
    return (
        <div>
            <h1>Chat</h1>
            <div className='main'>
                <ul className='message-container' id='message-container'>
                    <li className='message-left'>
                        <p className='message'>message left</p>
                    </li>
                    <li className='message-right'>
                        <p className='message'>message right</p>
                    </li>
                </ul>
                <form className='message-form' id='message-form'>
                    <input
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
