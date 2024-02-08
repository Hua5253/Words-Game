import { useNavigate } from "react-router-dom";

export default function ResultModal() {
    const navigate = useNavigate();
    return (
        <div
            className="Modal"
            id="resultModal"
            tabIndex={-1}
            aria-labelledby="ResultModalLabel"
            aria-hidden="true"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header d-grid justify-content-center">
                        <h5 className="modal-title">Game Ended</h5>
                    </div>
                    <div className="modal-body d-grid justify-content-center">
                        <div className="mt-3">Winner: "......"</div>
                        <div className="mt-3">Your Word: "......"</div>
                        <div className="mt-3">Opponent's Word: "......"</div>
                        <div className="mt-3">Number of Turns: "....."</div>
                    </div>
                    <div className="modal-footer d-grid justify-content-center">
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
