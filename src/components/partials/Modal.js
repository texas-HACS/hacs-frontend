import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import CloseButton from "./CloseButton";
import "./Modal.scss";

function Modal(props) {
  const [isOpen, setIsOpen] = useState(props.isOpen);

  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    if (props.onClose) {
      props.onClose();
    }
    document.body.style.overflow = "unset";
  };

  return (
    <ReactModal
      className="Modal"
      isOpen={isOpen}
      appElement={document.getElementById("AppRoot")}
      onRequestClose={close}
    >
      <CloseButton className="modal-close-button" onClick={() => close()} />
      <div className="flex content">{props.children}</div>
    </ReactModal>
  );
}
export default Modal;
