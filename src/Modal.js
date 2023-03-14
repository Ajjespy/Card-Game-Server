import React from "react";
import { Link } from "react-router-dom";
import './modal.css';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <Link to="/BlackJack.js"><button className="gameHomeBtn" type="button" onClick={handleClose}>Play Again</button></Link>
      </section>
    </div>
  );
};

export default Modal