import { useEffect, useState } from "react";

export default function CountDownModal() {
    const [counter, setCounter] = useState(3);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (counter > 0) {
            const timer = setTimeout(() => setCounter(counter - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setShow(false); // Hide the modal when the countdown is complete
        }
    }, [counter]); // Run effect whenever counter changes

    //   useEffect(() => {
    //     if (!Connecting) {
    //       setShow(false); // Hide the modal when connecting is done
    //     }
    //   }, [Connecting]); // Run effect whenever connecting changes
    return (
        <div
            className='Modal'
            id='countdownModal'
            tabIndex={-1}
            aria-labelledby='CountdownModalLabel'
            aria-hidden='true'
            data-bs-backdrop='static'
            data-bs-keyboard='false'
        >
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-header d-grid justify-content-center'>
                        <h5 className='modal-title'>Game Found</h5>
                    </div>
                    <div className='modal-body d-grid justify-content-center'>
                        <div className='mt-3'>{counter}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
