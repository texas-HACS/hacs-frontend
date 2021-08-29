import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./Modal.scss";

function HACSModal(props) {
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
  });

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  };

  return (
    <Modal
      className="Modal"
      isOpen={isOpen}
      appElement={document.getElementById("AppRoot")}
    >
      <button className="modal-close-button" onClick={close}>
        x
      </button>
      {props.children}
    </Modal>
  );
}
export default HACSModal;
