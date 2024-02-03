export default function CountDownModal() {
  return (
    <div
      className="modal fade"
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
            <div className="mt-3">__Count Down__</div>
          </div>
        </div>
      </div>
    </div>
  );
}
