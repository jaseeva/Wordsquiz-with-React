import React from "react";
import ActionIcon from "./ActionIcon";

const ModalBox = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <button className="action-icon close-modal" onClick={handleClose}><ActionIcon name='clear' /></button>
        </section>
      </div>
    );
  };

export default ModalBox;