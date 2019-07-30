import React from "react";
import ActionIcon from "./ActionIcon";

const ModalBox = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal shown" : "modal hidden";
  
    return (
      <div className={showHideClassName} onClick={handleClose}>
        <section className="modal-main">
            <button className="action-icon close-modal" onClick={handleClose}><ActionIcon name='clear' /></button>
          {children}
        </section>
      </div>
    );
  };

export default ModalBox;