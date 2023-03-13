import React from "react";
import { Link } from "react-router-dom";
import './modal.css';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button type="button" onClick={handleClose}>
            <Link to="/BlackJack.js" className="navLink">Play Again</Link>
        </button>
      </section>
    </div>
  );
};

export default Modal