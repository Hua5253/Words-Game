import { useEffect, useState } from "react";
interface Props {
    closeModal: () => void;
    timeout: number;
}

export default function CountDownModal({ timeout, closeModal }: Props) {
    const [counter, setCounter] = useState(timeout);
    // const navigate = useNavigate();

    useEffect(() => {
        // Decrease the timer every second
        const timer = setInterval(() => {
            setCounter((prevSeconds) => prevSeconds - 1);
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // When countdown reaches 0, call the onClose function
        if (counter <= 0) {
            setCounter(timeout);
            closeModal();
        }
    }, [counter]);

    return (
        <div
            className="Modal"
            id="countdownModal"
            tabIndex={-1}
            aria-labelledby="CountdownModalLabel"
            aria-hidden="true"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header d-grid justify-content-center">
                        <h5 className="modal-title">Game Found</h5>
                    </div>
                    <div className="modal-body d-grid justify-content-center">
                        <div className="mt-3">{counter}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
