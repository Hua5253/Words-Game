import "./HomeScreen.css";

function HomeScreen() {
    return (
        <div className='homescreen'>
            <div className='greeting'>
                Hello, <input type='text' className='name-input' />
            </div>
            <h1>Guessing Words Game</h1>
            <button type='button' className='btn btn-primary mt-5'>
                Play
            </button>
            <button type='button' className='btn btn-primary mt-3'>
                View Stats
            </button>
        </div>
    );
}

export default HomeScreen;
