import { Socket } from "socket.io-client";
import "../CSS/Modal.css";
interface Props {
    loadingGame: boolean;
    setInCountDown: () => void;
    socket: Socket;
}

export default function LoadingModal({ loadingGame, socket }: Props) {
    socket.on("opponent-found", () => {
        console.log("opponent found");
    });

    const handleJoinClick = () => {};

    if (!loadingGame) return null;

    return (
        <div
            className='Modal'
            id='loadingModal'
            tabIndex={-1}
            aria-labelledby='LoadingModalLabel'
            aria-hidden='true'
            data-bs-backdrop='static'
            data-bs-keyboard='false'
        >
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-header d-grid justify-content-center'>
                        <h5 className='modal-title'>Welcome</h5>
                    </div>
                    <div className='modal-body d-grid justify-content-center'>
                        <div className='text-center'>
                            <div
                                className='spinner-border'
                                role='status'
                                style={{ width: "3rem", height: "3rem" }}
                            >
                                <span className='visually-hidden'>
                                    Loading...
                                </span>
                            </div>
                        </div>
                        <div className='mt-3'>
                            Waiting for another player to join ....
                        </div>
                    </div>
                    <div className='modal-footer d-grid justify-content-center'>
                        <button
                            type='button'
                            className='btn btn-primary'
                            data-bs-dismiss='modal'
                            onClick={handleJoinClick}
                        >
                            join
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
